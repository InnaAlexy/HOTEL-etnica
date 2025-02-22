export const dateAfterDate = (date) => {
	if (!date) {
		return;
	}
	const afterDate = Date.parse(date) + 24 * 60 * 60 * 1000;
	const correctAfterDate = new Date(afterDate).toISOString().slice(0, 10);

	return correctAfterDate;
};
