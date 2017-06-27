# 移动端适配方案

> 24 Jan 2016, updated

## 固定高度，宽度自适应

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

## 固定宽度，viewport缩放

```html
<meta name="viewport" content="width=640,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no">
```

## rem做宽度，viewport缩放

- [lib-flexible](https://github.com/amfe/lib-flexible)
- [hotcss](https://github.com/imochen/hotcss)

__原理__

实际上做了这几件事情：

1. 动态生成 viewport
2. 屏幕宽度设置`rem`的大小，即给`<html>`设置`font-size`
3. 根据设备像素比（`window.devicePixelRatio`）给`<html>`设置`data-dpr`

```scss
$designWidth: 750; // 设计稿宽度
$rem: 750 / 10;
```

---

## 手机端页面自适应解决方案—[rem布局进阶版](flex.js)

该方案使用相当简单，把下面这段已压缩过的 原生JS（2017/5/3更新） 放到 HTML 的 head 标签中即可（注:不要手动设置viewport，该方案自动帮你设置）

> 这是阿里团队的高清方案布局代码，所谓高清方案就是根据设备屏幕的DPR（设备像素比，又称DPPX，比如dpr=2时，表示1个CSS像素由4个物理像素点组成） __动态设置 html 的font-size, 同时根据设备DPR调整页面的缩放值，进而达到高清效果__。

__此方案也是默认 1rem = 100px，所以你布局的时候，完全可以按照设计师给你的效果图写各种尺寸啦。__

比如你在效果图上量取的某个按钮元素长 55px, 宽37px ，那你直接可以这样写样式：

```css
.btn {
  width: 0.55rem;
  height: 0.37rem;
}
```
