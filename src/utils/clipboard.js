import { Notification } from "element-ui";

export const copy = (text, { success_title = '复制成功', error_title = "复制失败", success_message, error_message = "请手动复制" } = {}) => {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).then(
            () => {
                Notification({
                    title: success_title,
                    message: success_message || "复制内容 : " + text,
                    type: "success",
                });
            },
            () => {
                Notification.error({
                    title: error_title,
                    message: error_message,
                });
            }
        );
    } else {
        return new Promise((resolve, reject) => {
            let textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.readOnly = "readonly";
            textarea.style.position = "absolute";
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            let result = document.execCommand("copy");
            document.body.removeChild(textarea);
            if (result) {
                Notification({
                    title: success_title,
                    message: success_message || "复制内容 : " + text,
                    type: "success",
                });
                resolve();
            } else {
                Notification.error({
                    title: error_title,
                    message: error_message,
                });
                reject();
            }
        });
    }
}
