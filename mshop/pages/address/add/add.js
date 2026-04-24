Page({
  data: {
    id: null,
    form: {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id })
      this.loadEditData(options.id)
    }
  },

  loadEditData(id) {
    const list = wx.getStorageSync('addressList') || []
    const addr = list.find(item => item.id == id)
    if (addr) {
      this.setData({ form: addr })
    }
  },

  inputName(e) {
    this.setData({ 'form.name': e.detail.value })
  },
  inputPhone(e) {
    this.setData({ 'form.phone': e.detail.value })
  },
  inputProvince(e) {
    this.setData({ 'form.province': e.detail.value })
  },
  inputCity(e) {
    this.setData({ 'form.city': e.detail.value })
  },
  inputDistrict(e) {
    this.setData({ 'form.district': e.detail.value })
  },
  inputDetail(e) {
    this.setData({ 'form.detail': e.detail.value })
  },

  switchDefault(e) {
    this.setData({ 'form.isDefault': e.detail.value })
  },

  saveAddress() {
    const { id, form } = this.data
    const { name, phone, province, city, district, detail } = form

    if (!name) {
      return wx.showToast({ title: '请输入姓名', icon: 'none' })
    }
    if (!phone) {
      return wx.showToast({ title: '请输入手机号', icon: 'none' })
    }
    if (!province || !city || !district || !detail) {
      return wx.showToast({ title: '请填写完整地址', icon: 'none' })
    }

    let list = wx.getStorageSync('addressList') || []

    if (id) {
      list = list.map(item => {
        if (item.id == id) return form
        return item
      })
    } else {
      const newId = list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1
      list.push({ ...form, id: newId })
    }

    wx.setStorageSync('addressList', list)

    wx.showToast({ title: '保存成功' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  }
})