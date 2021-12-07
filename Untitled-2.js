const rng = () => {
	return Math.floor(Math.random() * 100 + 1);
};
var nums = [];
for (let i = 0; i < 150; i++) {
	nums.push(rng());
}

const answerIndices = [rng(), rng()];
var target = nums[answerIndices[0]] + nums[answerIndices[1]];

var map = new Map();

var answer = [];
for (let j = 0; j < nums.length; j++) {
	const e = nums[j];
	const delta = Math.abs(target - e);
	console.log(delta);
	if (map.has(e)) {
		console.log(e, map.get(e));
		answer = [map.get(e), j];
		break;
	} else {
		map.set(delta, j);
	}
}

console.log(map);
console.log(target);
console.log(answer);
console.log(nums[answer[0]], nums[answer[1]]);
console.log(answerIndices);
console.log(nums[answerIndices[0]], nums[answerIndices[1]]);
