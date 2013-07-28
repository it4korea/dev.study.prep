// 모듈 의존성
var express = require("express"); //웹 프레임워크

// 서버를 생성한다
var app = express();

// 서버를 설정한다
app.configure(function () {
    app.use(express.bodyParser()); //요청 바디를 파싱해서 req.body를 만든다
    app.use(express.methodOverride()); //HTTP 메쏘드를 덮어쓰기 위해서 req.body를 확인한다
    app.use(app.router); //url과 HTTP 메쏘드에 기반한 라우팅을 수행한다
    app.use(express.static(__dirname + '/public')); //정적 자원을 제공하는 곳
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true })); //개발시점에 모든 에러를 보여준다
});


// 서버를 구동한다
app.listen(8080, function () {
    console.log("Express server listening on port %d in %s mode", 8080, app.settings.env);
});
