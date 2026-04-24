Page({
  data: {
    inputText: "",
    msgList: [
      { type: "service", content: "您好，精品数码商城客服为您服务~" },
      { type: "service", content: "请问有什么可以帮您？" }
    ]
  },

  onInput(e) {
    this.setData({
      inputText: e.detail.value
    })
  },

  sendMsg() {
    let text = this.data.inputText.trim()
    if (!text) return

    let list = this.data.msgList
    list.push({
      type: "self",
      content: text
    })

    this.setData({
      msgList: list,
      inputText: ""
    })

    setTimeout(() => {
      list.push({
        type: "service",
        content: "已收到您的消息，客服会尽快回复您~"
      })
      this.setData({
        msgList: list
      })
    }, 800)
  }
})