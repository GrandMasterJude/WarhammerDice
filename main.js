

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
        wSaveFractionP.innerHTML = (" " + wSaveFraction[0] + " / " + wSaveFraction[1] + " So far we have " +
        hitWoundWSave[0] + " / " + hitWoundWSave[1]);
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
        aSaveFractionP.innerHTML = (" " + aSaveFraction[0] + " / " + aSaveFraction[1] + " So far we have " +
        hitWoundASave[0] + " / " + hitWoundASave[1]);
        wSaveFractionP.innerHTML = (" " + wSaveFraction[0] + " / " + wSaveFraction[1] + " So far we have " +
        hitWoundWSave[0] + " / " + hitWoundWSave[1]);
        totalFractionP.innerHTML = (" " + hitWoundASaveWSave[0] + " / " + hitWoundASaveWSave[1]);
    }

    document.getElementById("total").innerHTML = total;


    hitFractionP.innerHTML = (" " + hitFraction[0] + " / " + hitFraction[1]);
    woundFractionP.innerHTML = (" " + woundFraction[0] + " / " + woundFraction[1] + " So far we have " +
    hitWound[0] + " / " + hitWound[1]);


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
        
    } 

    
    // if toHit.value is > 6
    // if Reroll misses is true
    // if Reroll hits is true
    // Have a Reroll over/under certain number?
    return hitTotal;
}

// refactor changing each different innerhtml to be it's own function


// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
function reduce(numerator,denominator){
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
  }

DoMath();
