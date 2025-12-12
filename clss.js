let arr = prompt().split(" ");
let rev = [...arr].reverse();
if (arr.join("") === rev.join("")) alert("Yes");
else alert("No");

