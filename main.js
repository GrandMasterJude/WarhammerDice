

let toHit = document.getElementById("toHit");
let toWound = document.getElementById("toWound");
let toASave = document.getElementById("toASave");
let toWSave = document.getElementById("toWSave");
let hitFractionP = document.getElementById("hitFractionP");
let woundFractionP = document.getElementById("woundFractionP");
let aSaveFractionP = document.getElementById("aSaveFractionP");
let wSaveFractionP = document.getElementById("wSaveFractionP");
let totalFractionP = document.getElementById("totalFractionP");

function DoMath() {
    let total;
    // let hitChance = (1/6) * toHit.value;
    let woundChance = (1/6) * toWound.value;
    let aSaveChance = (1/6) * toASave.value;
    let wSaveChance = (1/6) * toWSave.value;
    let hitFraction = (reduce(toHit.value, 6));
    let woundFraction = (reduce(toWound.value, 6));
    let aSaveFraction = (reduce(toASave.value, 6));
    let wSaveFraction = (reduce(toWSave.value, 6));
    let hitWound = (reduce(hitFraction[0]*woundFraction[0],hitFraction[1]*woundFraction[1]));
    let hitWoundASave = (reduce(hitFraction[0]*woundFraction[0]*aSaveFraction[0],hitFraction[1]*woundFraction[1]*aSaveFraction[1]));
    let hitWoundWSave = (reduce(hitFraction[0]*woundFraction[0]*wSaveFraction[0],hitFraction[1]*woundFraction[1]*wSaveFraction[1]));
    let hitWoundASaveWSave= (reduce(hitFraction[0]*woundFraction[0]*aSaveFraction[0]*wSaveFraction[0],hitFraction[1]*woundFraction[1]*aSaveFraction[1]*wSaveFraction[1]));

   

    // This should probably have an hourglass shaped structure of checking all the dropdowns
    // Then doing the math and stuff, then checking as it prints each item
    // Not a structure of check what all is there first and then do a different set of code for each grouping

    let hitChance = ToHitCalc(toHit.value);
    // ToWoundCalc();
    // ToASaveCalc();
    // ToWSaveCalc();

    if (toASave.value == "None" && toWSave.value == "None") {
        total = hitChance * woundChance;
        totalFractionP.innerHTML = (" " + hitWound[0] + " / " + hitWound[1]);

    }
    else if (toASave.value == "None") {
        total = hitChance * woundChance * wSaveChance;
        wSaveFractionP.innerHTML = (" " + wSaveFraction[0] + " / " + wSaveFraction[1]);
        wSaveFractionP2.innerHTML = (" " + " So far we have " + hitWoundWSave[0] + " / " + hitWoundWSave[1]);
        totalFractionP.innerHTML = (" " + hitWoundWSave[0] + " / " + hitWoundWSave[1]);

    }
    else if (toWSave.value == "None") {
        total = hitChance * woundChance * aSaveChance;
        aSaveFractionP.innerHTML = (" " + aSaveFraction[0] + " / " + aSaveFraction[1] + " So far we have " +
        hitWoundASave[0] + " / " + hitWoundASave[1]);
        totalFractionP.innerHTML = (" " + hitWoundASave[0] + " / " + hitWoundASave[1]);

    }
    else {
        total = hitChance * woundChance * aSaveChance * wSaveChance;
        aSaveFractionP.innerHTML = (" " + aSaveFraction[0] + " / " + aSaveFraction[1] + "<p> So far we have " +
        hitWoundASave[0] + " / " + hitWoundASave[1]) + "</p>";
        wSaveFractionP.innerHTML = (" " + wSaveFraction[0] + " / " + wSaveFraction[1] + " So far we have " +
        hitWoundWSave[0] + " / " + hitWoundWSave[1]);
        totalFractionP.innerHTML = (" " + hitWoundASaveWSave[0] + " / " + hitWoundASaveWSave[1]);
    }

    document.getElementById("total").innerHTML = total;


    hitFractionP.innerHTML = (" " + hitFraction[0] + " / " + hitFraction[1]);
    woundFractionP.innerHTML = (" " + woundFraction[0] + " / " + woundFraction[1]);
    woundFractionP2.innerHTML = (" " + " So far we have " + hitWound[0] + " / " + hitWound[1]);


}

function ToHitCalc(hits) {
    let hitTotal;
    let hitHits = [hits*6,36];
    if (document.getElementById("rerollMissedHits").checked) {
        let missedHits = [(36 - hitHits[0]),36];
        let rehits = [missedHits[0]*hitHits[0],missedHits[1]*hitHits[1]];
        rehits = [rehits[0],rehits[1]];
        hitHits = [hitHits[0],hitHits[1]];
        console.log(reduce(rehits[0],rehits[1]));  // can I make it only reduce to a 36th?
        hitTotal = [hitHits[0]+rehits[0],1296];  // need to check if the denoms are the same then add
       

        console.log("hitHits : " + hitHits);
        console.log("missedHits : " + missedHits);
        console.log("rehits : " + rehits);
        console.log("Total Hits : " + hitTotal);
        console.log(mul(hitHits,missedHits));
    } 

    
    // if toHit.value is > 6
    // if Reroll misses is true
    // if Reroll hits is true
    // Have a Reroll over/under certain number?
    return hitTotal;
}

// refactor changing each different innerhtml to be it's own function

function mul(a, b) {
    parse(a, b);
    return new Fraction(
            this["s"] * P["s"] * this["n"] * P["n"],
            this["d"] * P["d"]
            );
  }


// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
function reduce(numerator,denominator){
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
  }

DoMath();

var P = {
    "s": 1,
    "n": 0,
    "d": 1
  };

var parse = function(p1, p2) {

    var n = 0, d = 1, s = 1;
    var v = 0, w = 0, x = 0, y = 1, z = 1;

    var A = 0, B = 1;
    var C = 1, D = 1;

    var N = 10000000;
    var M;

    if (p1 === undefined || p1 === null) {
      /* void */
    } else if (p2 !== undefined) {
      n = p1;
      d = p2;
      s = n * d;
    } else
      switch (typeof p1) {

        case "object":
        {
          if ("d" in p1 && "n" in p1) {
            n = p1["n"];
            d = p1["d"];
            if ("s" in p1)
              n *= p1["s"];
          } else if (0 in p1) {
            n = p1[0];
            if (1 in p1)
              d = p1[1];
          } else {
            throwInvalidParam();
          }
          s = n * d;
          break;
        }
        case "number":
        {
          if (p1 < 0) {
            s = p1;
            p1 = -p1;
          }

          if (p1 % 1 === 0) {
            n = p1;
          } else if (p1 > 0) { // check for != 0, scale would become NaN (log(0)), which converges really slow

            if (p1 >= 1) {
              z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
              p1 /= z;
            }

            // Using Farey Sequences
            // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

            while (B <= N && D <= N) {
              M = (A + C) / (B + D);

              if (p1 === M) {
                if (B + D <= N) {
                  n = A + C;
                  d = B + D;
                } else if (D > B) {
                  n = C;
                  d = D;
                } else {
                  n = A;
                  d = B;
                }
                break;

              } else {

                if (p1 > M) {
                  A += C;
                  B += D;
                } else {
                  C += A;
                  D += B;
                }

                if (B > N) {
                  n = C;
                  d = D;
                } else {
                  n = A;
                  d = B;
                }
              }
            }
            n *= z;
          } else if (isNaN(p1) || isNaN(p2)) {
            d = n = NaN;
          }
          break;
        }
        case "string":
        {
          B = p1.match(/\d+|./g);

          if (B === null)
            throwInvalidParam();

          if (B[A] === '-') {// Check for minus sign at the beginning
            s = -1;
            A++;
          } else if (B[A] === '+') {// Check for plus sign at the beginning
            A++;
          }

          if (B.length === A + 1) { // Check if it's just a simple number "1234"
            w = assign(B[A++], s);
          } else if (B[A + 1] === '.' || B[A] === '.') { // Check if it's a decimal number

            if (B[A] !== '.') { // Handle 0.5 and .5
              v = assign(B[A++], s);
            }
            A++;

            // Check for decimal places
            if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {
              w = assign(B[A], s);
              y = Math.pow(10, B[A].length);
              A++;
            }

            // Check for repeating places
            if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {
              x = assign(B[A + 1], s);
              z = Math.pow(10, B[A + 1].length) - 1;
              A += 3;
            }

          } else if (B[A + 1] === '/' || B[A + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"
            w = assign(B[A], s);
            y = assign(B[A + 2], 1);
            A += 3;
          } else if (B[A + 3] === '/' && B[A + 1] === ' ') { // Check for a complex fraction "123 1/2"
            v = assign(B[A], s);
            w = assign(B[A + 2], s);
            y = assign(B[A + 4], 1);
            A += 5;
          }

          if (B.length <= A) { // Check for more tokens on the stack
            d = y * z;
            s = /* void */
                    n = x + d * v + z * w;
            break;
          }

          /* Fall through on error */
        }
        default:
          throwInvalidParam();
      }

    if (d === 0) {
      throw new DivisionByZero();
    }

    P["s"] = s < 0 ? -1 : 1;
    P["n"] = Math.abs(n);
    P["d"] = Math.abs(d);
  };

  function modpow(b, e, m) {

    var r = 1;
    for (; e > 0; b = (b * b) % m, e >>= 1) {

      if (e & 1) {
        r = (r * b) % m;
      }
    }
    return r;
  }