export const firstCharToUpperCase = (word) => {
	if (!word) {
		return;
	}
	const upperFirstChar = word.toString().charAt(0).toUpperCase();
	const restOfWord = word.slice(1);
	const result = `${upperFirstChar}${restOfWord}`;

	return result;
};
