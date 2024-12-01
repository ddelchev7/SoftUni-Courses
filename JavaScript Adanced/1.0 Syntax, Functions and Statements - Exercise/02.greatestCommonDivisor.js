function greatestCommonDivider(a, b) {
  let gcd = a % b;

  while (gcd !== 0) {
    a = b;
    b = gcd;
    gcd = a % b;
  }
  console.log(b);
}

greatestCommonDivider(15, 5);
