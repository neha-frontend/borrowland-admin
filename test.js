/* eslint-disable no-plusplus */
const data = [
  { name: 'a', amount: 1 },
  { name: 'a', amount: 2 },
  { name: 'a', amount: 3 },
  { name: 'b', amount: 2 },
  { name: 'b', amount: 3 },
  { name: 'c', amount: 3 },
  { name: 'c', amount: 2 },
  { name: 'c', amount: 3 },
];

const newData = data.reduce((prev, val) => {
  const elem = prev.findIndex(item => item && item.name === val.name);
  if (elem !== -1) {
    let element = prev[elem];
    element = {
      ...element,
      amount: (element.amount * element.count + val.amount) / (element.count + 1),
      count: element.count + 1,
    };
    prev[elem] = element;
    return prev;
  }
  return [...prev, { ...val, count: 1 }];
}, []);

const timer = () => {
  // 28 : 20 : 200
  const time = new Date();
  const minute = time.getMinutes();
  const seconds = time.getSeconds();
  const milisecond = time.getMilliseconds();
  let remaining = 0;
  if (minute <= 30) {
    remaining += seconds * 1000;
    remaining += milisecond;
    remaining = (30 - minute) * 60 * 1000 - remaining;
  } else {
    remaining += seconds * 1000;
    remaining += milisecond;
    remaining = (60 - minute) * 60 * 1000 - remaining;
  }
  // console.log(remaining);
  return { remaining, newData };
};
timer();

// const pre = new Date();

// for (let i = 0; i < 100000000; i++) {
//   // here
// }

// console.log(new Date() - pre);
const lengthOfLongestSubstring = function (s) {
  let lss = '';
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const ind = lss.indexOf(s[i]);
    lss += s[i];
    if (ind >= 0) lss = lss.substring(ind + 1);
    max = Math.max(max, lss.length);
  }
  return max;
};
const x = [1, 2, 4, 6, 9, 8].sort((a, b) => a - b);
let max = x[0];
for (let i = 0; i < x.length; i++) {
  if (x[i] > max) {
    max = x[i];
  }
}

const str = 'Geeks';
let nstr = '';
for (let i = str.length - 1; i >= 0; i--) {
  nstr = str[i] + nstr;
}
const findMedianSortedArrays = function (nums1, nums2) {
  let i = 0;
  let j = 0;
  const sortarr = [];
  for (i = 0; i < nums1.length; ) {
    if (nums1[i] > nums2[j]) {
      sortarr.push(nums2[j]);
      j++;
    } else {
      sortarr.push(nums1[i]);
      i++;
    }
  }
  console.log(j);
  for (j; j < nums2.length; j++) {
    console.log(nums2[j]);
    sortarr.push(nums2[j]);
  }
  const { length } = sortarr;
  if (length % 2) {
    return sortarr[Math.floor(length / 2)];
  }
  return (sortarr[length / 2] + sortarr[length / 2 - 1]) / 2;
};
// const ispalDrom = function (s) {
//   let newst = '';
//   for (let i = s.length - 1; i >= 0; i--) {
//     newst += s[i];
//   }
//   return s === newst;
// };
// const longestPalindrome = function (s) {
//   let lss = '';
//   const len = s.length;
//   for (let i = 0; i < len; i++) {
//     let nestr = s[i];
//     let j = i - 1;

//     for (let k = i + 1; k < len; ) {
//       if (s[j] !== s[k]) return;
//       nestr = s[j] + s[i] + s[k];
//       if (nestr.length > lss.length) lss = nestr;
//       j -= 1;
//       k += 1;
//     }
//   }
//   return lss;
// };
function getUpdatedString(s) {
  let sb = "";
  for (let i = 0; i < s.length; i++) {
      sb += `#${  s[i]}`;
  }
  sb += "#";
  return sb;
}
const longestPalindrome = function (s) {
  // Update the string to put hash "#" at the beginning, end and in between each character
  const updatedString = getUpdatedString(s);
  // Length of the array that will store the window of palindromic substring
  const length = 2 * s.length + 1;
  // Array to store the length of each palindrome centered at each element
  const p = new Array(length);
  p.fill(0);
  // Current center of the longest palindromic string
  let c = 0;
  // Right boundary of the longest palindromic string
  let r = 0;
  // Maximum length of the substring
  let maxLength = 0;
  // Position index
  let position = -1;
  for (let i = 0; i < length; i++) {
      // Mirror of the current index
      const mirror = 2 * c - i;
      // Check if the mirror is outside the left boundary of current longest palindrome
      if (i < r) {
          p[i] = Math.min(r - i, p[mirror]);
      }
      // Indices of the characters to be compared
      let a = i + (1 + p[i]);
      let b = i - (1 + p[i]);
      // Expand the window
      console.log(a,b,i)
      while (a < length && b >= 0 && updatedString[a] === updatedString[b]) {
        console.log(a,b,i)
          p[i]++;
          a++;
          b--;
      }
      // If the expanded palindrome is expanding beyond the right boundary of
      // the current longest palindrome, then update c and r
      if (i + p[i] > r) {
          c = i;
          r = i + p[i];
      }
      if (maxLength < p[i]) {
          maxLength = p[i];
          position = i;
      }
  }
  const offset = p[position];
  let result = "";
  for (let i = position - offset + 1; i <= position + offset - 1; i++) {
      if (updatedString[i] !== '#') {
          result += updatedString[i];
      }
  }
  return result;
};

console.log(
  lengthOfLongestSubstring('aabdjdjdj'),
  max,
  nstr,
  findMedianSortedArrays([2, 5], [6, 9, 13, 15, 17, 18]),
  longestPalindrome('abcde'),
);


