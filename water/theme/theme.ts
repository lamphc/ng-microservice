export default class WaterTheme {
    protected lessUrl: string = "/assets/less/soa.soaname.less";
    protected compileUrl: string = "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js";;

    private compileLoaded = false;

    /**
     * 设置编译配置
     * @param lessUrl 
     * @param compileUrl 
     */
    setBase(lessUrl?: string, compileUrl?: string) {
        lessUrl && (this.lessUrl = lessUrl);
        compileUrl && (this.compileUrl = compileUrl)
    }

    initLess(src?: string) {
        const node = document.createElement("link");
        node.rel = "stylesheet/less";
        node.type = "text/css";
        node.href = src ? src : this.lessUrl;
        document.getElementsByTagName("head")[0].appendChild(node);
    }
    /**
     * 设置less配置和变量
     * @param lvar 
     * @param cb 
     */
    protected setLess(lvar: any, cb?: Function) {
        (window as any).less
            .modifyVars({
                "@primary-color": lvar
            })
            .then(() => {
                cb && cb();
                window.scrollTo(0, 0);
            });
    }

    /**
     * 切换和编译主题
     * @param lvar 
     * @param cb 
     */
    changeTheme(lvar: any, cb?: Function) {
        if (this.compileLoaded) {
            this.setLess(lvar, cb)
        } else {
            (window as any).less = {
                async: true
            };
            this.loadCompile(this.compileUrl).then(() => {
                this.compileLoaded = true;
                this.setLess(lvar, cb)
            });
        }
    }
    /**
     * 加载编译器
     * @param src 
     */
    protected loadCompile(src: string) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
}