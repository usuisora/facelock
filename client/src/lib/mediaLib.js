export async function getCamsIds() {
	const devices = await navigator.mediaDevices.enumerateDevices();
	const camIds = await devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
	return camIds;
}
