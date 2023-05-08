export const delay = (delayInms) => {
	return new Promise(resolve => setTimeout(resolve, delayInms));
}