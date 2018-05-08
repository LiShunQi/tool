/**
 * Created by ggshu on 2018/5/8.
 */

//监听器
function observe(data){
    if(!data || typeof data !== 'object') return;

    Object.keys(data).forEach(function (key,i,arr) {
        defineReactive(data, key, data[key]);
    })
}

function defineReactive(data, key, val){
    observe(val);

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false, //不能再定义
        get: function() {
            return val;
        },
        set: function (newVal) {
            console.log('监听到值别花了');
            val = newVal;
        }
    })
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
};

function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if(this.$el){
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    init: function () {
        this.compileElement(this.$fragment);
    },
    node2Fragment: function (el) {
        var fragment = document.createDocumentFragment(),child;

        while(child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
};

