import { defineStore } from 'pinia'

const useModal = defineStore('modal', {
  state: () => ({
    modals: [],
    visibleModal: new Set([]),
    timeOut: null
  }),
  actions: {
    open({ component, props, emits }) {
      const modalKey = new Date().valueOf()
      this.modals.push({
        component,
        props: { modalKey, ...props },
        emits: { ...emits }
      })
      this.visibleModal.add(modalKey)
    },
    close(key) {
      this.visibleModal.delete(key)
      this.timeOut = setTimeout(() => {
        this.modals.splice(
          this.modals.findIndex((item) => item.props.modalKey === key),
          1
        )
        clearTimeout(this.timeOut)
      }, 400)
    }
  }
})

export default useModal
