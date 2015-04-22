/******************************************************************************
 *
 * For the sake of keeping the script dependecy free I'm including a custom
 * AJAX function. You should probably use a third party plugin
 *
 */
function ajax(url, parms) {
    parms = parms || {};
    var req = new XMLHttpRequest(),
      post = parms.post || null,
      callback = parms.callback || null,
      timeout = parms.timeout || null;

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;

      // Error
      if (req.status != 200 && req.status != 304) {
        if (callback) callback(false);
        return;
      }

      if (callback) callback(req.responseText);
    };

    if (post) {
      req.open('POST', url, true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    } else {
      req.open('GET', url, true);
    }

    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    req.send(post);

    if (timeout) {
      setTimeout(function() {
        req.onreadystatechange = function() {};
        req.abort();
        if (callback) callback(false);
      }, timeout);
    }
  }
  /*
   *****************************************************************************/

var myScroll;
var position, positionY;
var pullDownEl, pullDownOffset;
var pullUpEl, pullUpOffset;
var generatedCount = 0;

/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();    // 数据加载完成后，调用界面更新方法
 */
function pullDownAction() {
  setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
    var el, li, i;
    el = document.getElementById('thelist');

    for (i = 0; i < 3; i++) {
      li = document.createElement('li');
      li.innerText = 'Generated row ' + (++generatedCount);
      el.insertBefore(li, el.childNodes[0]);
    }

    myScroll.refresh(); //数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
  }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();    // 数据加载完成后，调用界面更新方法
 */
function pullUpAction() {
  setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
    var el, li, i;
    el = document.getElementById('thelist');

    for (i = 0; i < 3; i++) {
      li = document.createElement('li');
      li.innerText = 'Generated row ' + (++generatedCount);
      el.appendChild(li, el.childNodes[0]);
    }

    myScroll.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
  }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function requestData(start, count) {
  ajax('dataset.php?start=' + +start + '&count=' + +count, {
    callback: function(data) {
      data = JSON.parse(data);
      myScroll.updateCache(start, data);
    }
  });
}

function updateContent(el, data) {
  el.innerHTML = data;
}

function loaded() {
  position = document.getElementById('position');
  pullDownEl = document.getElementById('pullDown');
  pullDownOffset = pullDownEl.offsetHeight;
  pullUpEl = document.getElementById('pullUp');
  pullUpOffset = pullUpEl.offsetHeight;

  myScroll = new IScroll('#wrapper', {
    startY: -pullDownOffset,
    mouseWheel: true,
    //infiniteElements: '#scroller .row',
    //infiniteLimit: 2000,
    //dataset: requestData,
    //dataFiller: updateContent,
    //cacheSize: 20,
    probeType: 1
  });

  myScroll.on('scroll', function() {
    console.info('scroll');
    positionY = this.y >> 0;
    position.innerHTML = positionY; // updatePosition
    if (positionY > 5 && !pullDownEl.className.match('flip')) {
      pullDownEl.className = 'flip';
      pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
    } else if (positionY < 5 && pullDownEl.className.match('flip')) {
      pullDownEl.className = '';
      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
    } else if (positionY < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
      pullUpEl.className = 'flip';
      pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
      this.maxScrollY = this.maxScrollY;
    } else if (positionY > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
      pullUpEl.className = '';
      pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
      this.maxScrollY = pullUpOffset;
    }
  });

  myScroll.on('scrollEnd', function() {
    console.info('scrollEnd');
    if (pullDownEl.className.match('flip')) {
      pullDownEl.className = 'loading';
      pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
      pullDownAction(); // Execute custom function (ajax call?)
    } else if (pullUpEl.className.match('flip')) {
      pullUpEl.className = 'loading';
      pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
      pullUpAction(); // Execute custom function (ajax call?)
    }
  });

  myScroll.on('refresh', function() {
    console.info('refresh');
    if (pullDownEl.className.match('loading')) {
      pullDownEl.className = '';
      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
      myScroll.scrollTo(0, -pullDownOffset);
    } else if (pullUpEl.className.match('loading')) {
      pullUpEl.className = '';
      pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
    }
  });
}

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', loaded, false);
