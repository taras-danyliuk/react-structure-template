#!/bin/bash

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
program_is_installed () {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
npm_package_is_installed () {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
echo_fail () {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  printf "\033\e[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
echo_pass () {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  printf "\033\e[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
echo_if () {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

echo "node    $(echo_if $(program_is_installed node))"
echo "npm    $(echo_if $(program_is_installed npm))"

# Check if npx is available
if [ ! "$(program_is_installed node)" == 1 ]; then
    echo "npx is not available"
    exit 1
fi


echo "";
echo "";


# Ask for choices
PRNAME="";
ADMIN=false;
UIKIT="";
SSR=false;
CODESPLITTING=false;

# Project name
while true; do
    read -p "What is the name of your project: " pr_name

    if [ "$pr_name" = "" ]; then
        echo "you need to provide project title"
    else
        PRNAME=$pr_name;
        break;
    fi
done

# Admin Panel
#while true; do
#    read -p "1. Do you want to add Admin Panel? " yn
#    case $yn in
#        [Yy]* ) ADMIN=true; break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done

# UI KIT Library
#while true; do
#    read -p "2. Do you want to add UI KIT? " yn
#    case $yn in
#        [Yy]* )
#            echo "Choose UI KIT for project (enter option number)."
#            select option in "Antd" "MaterialUI" "Evergreen" "Bootstrap"; do
#                case $option in
#                    Antd ) UIKIT="Antd"; break;;
#                    MaterialUI ) UIKIT="MaterialUI"; break;;
#                    Evergreen ) UIKIT="Evergreen"; break;;
#                    Bootstrap ) UIKIT="Bootstrap"; break;;
#                esac
#            done
#            break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done

# SSR
#while true; do
#    read -p "1. Do you want to add Server Side Rendering? " yn
#    case $yn in
#        [Yy]* ) SSR=true; break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done

# Code splitting
#while true; do
#    read -p "4. Do you want to add Code Splitting? " yn
#    case $yn in
#        [Yy]* ) CODESPLITTING=true; break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done


echo "";
echo "Project Name:      $PRNAME";
#echo "ADMIN:            $ADMIN"
#echo "UIKIT:            $UIKIT";
#echo "SSR:               $SSR";
#echo "CODE SPLITTING:   $CODESPLITTING";
echo "";
echo "";



##########################################################################################
##########################################################################################
##########################################################################################



npx create-react-app "$PRNAME"
cd "$PRNAME"
printf 'y\n' | npm run eject
rm yarn.lock
rm -rf public
rm README.md


curl -L https://github.com/taras-danyliuk/react-structure-template/archive/master.zip | tar zx

cp react-structure-template-master/README.md README.md
cp react-structure-template-master/.eslintignore .eslintignore

cp -rf react-structure-template-master/public public
cp -rf react-structure-template-master/src src-copy

cp src/reportWebVitals.js src-copy/reportWebVitals.js
cp src/setupTests.js src-copy/setupTests.js
rm -rf src
mv src-copy src

# Split and modify package.json
node react-structure-template-master/modifyPackage.js

# Modify webpack.config.js
node react-structure-template-master/modifyWebpack.js

# Add npm packages
packages=$(<react-structure-template-master/packages.txt)
packages_dev=$(<react-structure-template-master/packages-dev.txt)
npm install --save $packages
npm install --save-dev $packages_dev

rm -rf react-structure-template-master


#########################
### CONDITIONAL PARTS ###
#########################
# SSR SECTION
if [ "$SSR" = true ]; then
    curl -L https://github.com/taras-danyliuk/react-structure-template/archive/ssr.zip | tar zx

    cp -rf react-structure-template-ssr/ssr ssr
    cp -rf react-structure-template-ssr/src/* src

    # Add reducer to root reducer
    node react-structure-template-ssr/modifyRootReducer.js

    # Add script to package.json
    node react-structure-template-ssr/modifyPackage.js

    packages=$(<react-structure-template-ssr/packages.txt)
    npm i --save $packages

    rm -rf react-structure-template-ssr
fi

echo ".idea/" >> .gitignore
echo "eslint-report.json" >> .gitignore


########################
### ADD NPM PACKAGES ###
########################
npm install


# Initialize custom hooks
git config --local core.hooksPath ./custom-git-hook

git add .
git commit -n -q -m "Initial commit from React Project Setup"
