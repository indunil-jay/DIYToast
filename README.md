
# Toast Web component using  TypeScript

The Toast library provides a simple and customizable way to display toast notifications in web applications. Toast notifications are small, non-intrusive messages that appear temporarily at the top or bottom of the screen to provide feedback to the user.



## Features

- Display toast notifications with customizable content and appearance.
- Live previewsControl the position of the toast notifications on the screen.llscreen mode
- Set the duration for how long the toast notifications should be displayed.
- Automatically close toast notifications after a specified duration.
- Show progress bars indicating the time remaining for auto-closing toast notifications.
- Customize the type of toast notifications (success, error, info, warning).




## Usage/Examples

```javascript
const toast = new Toast({
  position: "top-right",
  text: "Hello world!",
  type: "success",
  autoClose: true,
  showProgress: true,
  showRemainSeconds: true
});

```


## Options
- position: Specifies the position on the screen where the toast notification should appear (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center).
- text: The content of the toast notification.
- type: The type of toast notification (success, error, info, warning).
- autoClose: Whether the toast notification should automatically close after a specified duration.
- showProgress: Whether to display a progress bar indicating the time remaining for auto-closing.
- showRemainSeconds: Whether to display the remaining seconds for auto-closing
  
## Author
- [@indunil-jay](https://github.com/indunil-jay)

