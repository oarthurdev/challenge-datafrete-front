/**
 * Launch toast notification
 *
 * @param  {[Integer]} type Type of toast [1- Positive, 2- Negative, 3- Info, 4- Default]
 * @param  {[String]} message Message of toast
 * @param {[Integer]} timeout Timeout of toast
 * @param {[String]} position Position of toast
 */
 export function launchToast(type, message, timeout = 5000, position = 'bottom-right') {
     console.log(message)
    return this.$toast.error(message, {
        position: position,
        timeout: timeout,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
  }
  