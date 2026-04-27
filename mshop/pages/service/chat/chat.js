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
    // 把用户发的消息加到列表里
    list.push({
      type: "self",
      content: text
    })

    // 清空输入框，更新列表
    this.setData({
      msgList: list,
      inputText: ""
    })

    // 👇 重点修改这里：增加关键词判断逻辑
    setTimeout(() => {
      // 1. 设置一个默认的“兜底”回复（如果都没匹配上，就说这句话）
      let replyMsg = "抱歉，机器人客服没太明白您的意思呢。已为您呼叫人工客服，请稍等~";

      // 2. 根据用户输入的关键词，动态修改回复内容
      if (text.includes("推荐") || text.includes("买什么") || text.includes("想要")) {
        replyMsg = "亲，店长强烈推荐您去首页看看我们的【🔥热门商品】专区哦，目前正在做活动，超级划算！";
      } 
      else if (text.includes("发货") || text.includes("快递") || text.includes("物流")) {
        replyMsg = "亲亲，我们会在订单付款后48小时内飞速为您发货，默认发顺丰快递哦！📦";
      } 
      else if (text.includes("退换") || text.includes("退款") || text.includes("售后")) {
        replyMsg = "哎呀，给您带来不便了！请您前往【我的订单】页面点击“申请售后”，人工会尽快为您处理。🤝";
      } 
      else if (text.includes("多少钱") || text.includes("价格") || text.includes("优惠")) {
        replyMsg = "最近是品牌大牌日，有满600减160的活动哦，您可以去首页领取优惠券再下单~💰";
      } 
      else if (text.includes("你好") || text.includes("在吗") || text.includes("有人吗")) {
        replyMsg = "在的呢亲！客服小助手24小时在线，请问有什么可以帮到您？";
      }

      // 3. 把最终确定的回复发出去
      list.push({
        type: "service",
        content: replyMsg
      })
      this.setData({
        msgList: list
      })
    }, 800) // 模拟 0.8 秒后客服回复
  }
})