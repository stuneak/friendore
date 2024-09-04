import { notifications } from '@mantine/notifications';

function debounce(func, timeout = 300) {
	let timer;
	return {
		run: (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		},
		clear: () => {
			clearTimeout(timer);
		},
	};
}
function showNotificationForUnsavedChanges() {
	notifications.hide('unsaved-changes');
	notifications.show({
		id: 'unsaved-changes',
		autoClose: 10000,
		withCloseButton: true,
		message:
			'It looks like your profile details have changed. Please save the changes!',
	});
}

export const reminderForSaving = debounce(
	() => showNotificationForUnsavedChanges(),
	10000
);

export const cleanAllNotifications = () => {
	notifications.clean();
	notifications.cleanQueue();
	reminderForSaving.clear();
};
