import { h } from 'vue';

type NotificationMsg = {
  message: string;
  buttonName?: string;
};

const activeMessages = new Set<string>();

export function showNotification(msg: NotificationMsg, callback: () => void) {
  const key = msg.message.trim();
  if (activeMessages.has(key)) return;
  activeMessages.add(key);
  const close = ElNotification({
    title: 'Systematic Notification',
    message: h('div', [
      h('p', key),
      h(
        ElButton,
        {
          type: 'primary',
          size: 'small',
          onClick: () => {
            callback();
            close.close();
          },
          style: 'margin-top: 8px;',
        },
        () => msg.buttonName || 'Synchronize',
      ),
    ]),
    position: 'bottom-left',
    duration: 0,
    showClose: false,
    onClose: () => {
      activeMessages.delete(key);
    },
  });

  return close;
}
