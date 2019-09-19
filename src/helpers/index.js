class Utils {
  static dateToISODate(date) {
    const target = new Date(date);

    return `${target.getFullYear()}-${target.getMonth() + 1}-${target.getDate()}`;
  }
}

export default Utils;
