var nodes = [];
var infos = [];
// 点击群聊进入群聊
document.evaluate("//div[@class='conv-item-content']", document, null, XPathResult.ANY_TYPE, null).iterateNext().click();

// 点击人员名单进入名单
setTimeout(() => {
  document.evaluate("//i[@class='iconfont icon-group-setting ng-scope tipper-attached']", document, null, XPathResult.ANY_TYPE, null).iterateNext().click();

  setTimeout(() => {
    // 拉到最底，人员名单存在前端懒加载
    let container = document.querySelector(".group-setting-container.body.settings.ng-isolate-scope");
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      // 选择全部节点
      var xpath = "//div[@class='normal user-avatar ng-isolate-scope']";
      var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
      var node = null;
      while (node = result.iterateNext()) {
        nodes.push(node);
      }

      // eg. let name = document.querySelector(".box-item>.label[htitle='姓名']").nextElementSibling.innerText 取信息
      function getInfo(title) {
        console.log(".box-item>.label[htitle='" + title + "']");
        let ele = document.querySelector(".box-item>.label[htitle='" + title + "']")
        if (!ele) return '';
        return ele.nextElementSibling.innerText
      }


      // 遍历处理
      var index = 0; var end = nodes.length;
      function getAllInfo() {
        console.log("index:" + index);
        console.log("end: " + end);
        console.log("check: ");
        console.log(index - end)
        if (index < end) {
          let node = nodes[index];

          node.click();

          setTimeout(() => {
            // 取信息
            info = {
              name: getInfo("姓名"),
              phone: getInfo("电话"),
              enterTime: getInfo("入职时间"),
              employeeType: getInfo("员工类型"),
              dep: getInfo("部门")
            };

            infos.push(info);

            // 关窗口，只能消除dom，钉钉web backdrop click没处理，会打断函数运行
            // document.evaluate("//i[@class='iconfont close dialog-close']", document, null, XPathResult.ANY_TYPE, null).iterateNext().click();
            document.querySelector(".modal-content").remove();

            //拿下一个
            index++;
            getAllInfo();
          }, 2000);

        }

      }
      getAllInfo();
    }, 2000);
  }, 2000)
}, 2000)