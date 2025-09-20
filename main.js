(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[1970], {
    2851: (e, n, t) => {
        Promise.resolve().then(t.bind(t, 6767))
    }
    ,
    6767: (e, n, t) => {
        "use strict";
        t.r(n),
        t.d(n, {
            default: () => g
        });
        var s = t(5155)
          , r = t(3904)
          , i = t(5196)
          , h = t(4357)
          , l = t(5339)
          , a = t(6766)
          , c = t(2115)
          , o = t(9375);
        class d {
            generateCardNumber(e) {
                let n = "";
                for (let t = 500; t >= 1; t--) {
                    n = this.sbtStringSpRnd(e, "x", "0123456789");
                    let t = this.sbtString(n, " -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ")
                      , s = this.chkLCD(t)
                      , r = this.chkCCCksum(t, this.rand(0, 9));
                    if (s && r)
                        break
                }
                return n
            }
            generateCvv() {
                let e = this.bin.length < 16 ? 4 : 3
                  , n = this.form.cvv || "";
                if (1 === n.length && 3 === e)
                    for (let e = 0; e < 2; e++)
                        n += this.rand(0, 9);
                for (; n.length < e; )
                    n += this.rand(0, 9);
                return n.substring(0, e)
            }
            generateExpirationMonth() {
                return ("0" + (parseInt(this.form.expirationDateMonth) || this.rand(1, 12))).slice(-2)
            }
            generateExpirationYear() {
                let e = new Date().getFullYear();
                return (parseInt(this.form.expirationDateYear) || this.rand(e, e + 8)).toString()
            }
            generateBalance() {
                let e = this.form.balance.split("-")
                  , n = parseInt(e[0], 10);
                return (100 * Math.ceil((Math.random() * (parseInt(e[1], 10) - n) + n) / 100)).toString()
            }
            rand(e, n) {
                return Math.floor(Math.random() * (n - e + 1)) + e
            }
            sbtStringSpRnd(e, n, t) {
                t || (t = "0123456789");
                let s = "";
                for (let r = 0; r < e.length; r++) {
                    let i = e.substring(r, r + 1);
                    -1 === n.indexOf(i) ? s += i : s += this.midS(t, Math.floor(Math.random() * (t.length - 1)) + 1, 1)
                }
                return s
            }
            sbtString(e, n) {
                let t = "";
                for (let s = 0; s < e.length; s++) {
                    let r = e.substring(s, s + 1);
                    -1 === n.indexOf(r) && (t += r)
                }
                return t
            }
            chkLCD(e) {
                let n = this.isdiv(e.length, 2)
                  , t = 0;
                for (let s = 1; s <= e.length; s++) {
                    let r = parseInt(this.midS(e, s, 1));
                    this.isdiv(s, 2) !== n && (r *= 2) > 9 && (r -= 9),
                    t += r
                }
                return this.isdiv(t, 10)
            }
            chkCCCksum(e, n) {
                let t = ""
                  , s = 1;
                for (let n = 1; n < e.length; n++) {
                    let r = parseInt(this.midS(e, n, 1)) * parseInt(this.midS("21", s, 1));
                    t += r = this.sumDigits(r),
                    ++s > 2 && (s = 1)
                }
                let r = this.sumDigits(t, -1);
                return (10 * this.sumDigits(r, -1) - r) % 10 == parseInt(this.rightS(e, 1))
            }
            midS(e, n, t) {
                return t || (t = e.length),
                n = parseInt(n.toString()),
                t = parseInt(t.toString()),
                n < 0 && n++,
                e.substring(n - 1, n - 1 + t)
            }
            rightS(e, n) {
                return n >= 1 ? e.substring(e.length - n, e.length) : ""
            }
            isdiv(e) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
                return e = parseInt(e.toString()),
                n = parseInt(n.toString()),
                e / n === Math.floor(e / n)
            }
            sumDigits(e) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                if (e = e.toString(),
                n > 0)
                    for (; e.length > n; ) {
                        let n = 0;
                        for (let t = 1; t <= e.length; t++)
                            n += parseInt(this.midS(e.toString(), t, 1));
                        e = n.toString()
                    }
                else
                    for (let t = 1; t <= Math.abs(n); t++) {
                        let n = 0;
                        for (let t = 1; t <= e.length; t++)
                            n += parseInt(this.midS(e.toString(), t, 1));
                        e = n.toString()
                    }
                return parseInt(e.toString())
            }
            generate(e) {
                if (e.length < 6)
                    return [];
                this.isGenerating = !0,
                this.bin = e,
                this.items = [];
                let n = parseInt(this.form.quantity.toString()) || 5;
                for (let t = 0; t < n; t++)
                    this.items.push({
                        card_number: this.generateCardNumber(e),
                        expiration_month: this.generateExpirationMonth(),
                        expiration_year: this.generateExpirationYear(),
                        cvv: this.generateCvv(),
                        currency: this.form.currency || "USD",
                        balance: this.generateBalance()
                    });
                return this.isGenerating = !1,
                this.items
            }
            constructor() {
                this.bin = "",
                this.form = {
                    cvv: "",
                    expirationDateMonth: "",
                    expirationDateYear: "",
                    quantity: 5,
                    currency: "USD",
                    balance: "500-1000"
                },
                this.items = [],
                this.isGenerating = !1
            }
        }
        let m = new d;
        function g() {
            let[e,n] = (0,
            c.useState)("cards")
              , [t,d] = (0,
            c.useState)(null)
              , [g,x] = (0,
            c.useState)(!1)
              , [u,p] = (0,
            c.useState)(!1)
              , {userProfile: b} = (0,
            o.P)()
              , [j,f] = (0,
            c.useState)([])
              , N = function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!e && !g) {
                    alert("Bạn cần có số dư trên 1000đ để sử dụng tính năng này!");
                    return
                }
                p(!0),
                m.form.quantity = 5,
                m.form.currency = "USD",
                m.form.balance = "500-1000",
                setTimeout( () => {
                    f(m.generate("41546444014xxxxx").map(e => ({
                        number: e.card_number,
                        expMonth: e.expiration_month,
                        expYear: e.expiration_year,
                        cvv: e.cvv
                    }))),
                    p(!1)
                }
                , 1e3)
            };
            (0,
            c.useEffect)( () => {
                b && x(parseFloat(b.money || "0") >= 1e3)
            }
            , [b]),
            (0,
            c.useEffect)( () => {
                N(!0)
            }
            , []);
            let v = e => {
                if (!g) {
                    alert("Bạn cần có số dư trên 1000đ để sử dụng tính năng này!");
                    return
                }
                let n = j[e]
                  , t = "".concat(n.number, "|").concat(n.expMonth, "|").concat(n.expYear, "|").concat(n.cvv);
                navigator.clipboard.writeText(t),
                d(e),
                setTimeout( () => d(null), 2e3)
            }
              , y = e => "****" + e.slice(-4)
              , k = () => "***";
            return (0,
            s.jsx)("div", {
                className: "container mx-auto",
                children: (0,
                s.jsxs)("div", {
                    className: "bg-white rounded-lg shadow-lg p-6 mb-8",
                    children: [(0,
                    s.jsx)("h1", {
                        className: "text-3xl font-bold mb-6 text-center text-gray-800",
                        children: "Hướng Dẫn Cursor TRIAL"
                    }), (0,
                    s.jsxs)("div", {
                        className: "flex border-b border-gray-200 mb-6",
                        children: [(0,
                        s.jsx)("button", {
                            onClick: () => n("cards"),
                            className: "px-4 py-2 font-medium text-sm ".concat("cards" === e ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"),
                            children: "Thẻ Ảo Có Sẵn"
                        }), (0,
                        s.jsx)("button", {
                            onClick: () => n("the-ao"),
                            className: "px-4 py-2 font-medium text-sm ".concat("the-ao" === e ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"),
                            children: "Tạo Thẻ Ảo Timo"
                        }), (0,
                        s.jsx)("button", {
                            onClick: () => n("reset-trial"),
                            className: "px-4 py-2 font-medium text-sm ".concat("reset-trial" === e ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"),
                            children: "Reset Trial Cursor"
                        })]
                    }), (0,
                    s.jsxs)("div", {
                        className: "space-y-6 text-gray-700",
                        children: ["cards" === e && (0,
                        s.jsx)(s.Fragment, {
                            children: (0,
                            s.jsxs)("section", {
                                children: [(0,
                                s.jsx)("h2", {
                                    className: "text-2xl font-semibold mb-3 text-gray-800",
                                    children: "Thẻ Ảo Có Sẵn Để Đăng Ký Cursor"
                                }), (0,
                                s.jsx)("p", {
                                    className: "mb-4",
                                    children: "Dưới đây là danh sách các thẻ ảo có sẵn để bạn sử dụng đăng ký Cursor Free Trial. Nhấn vào nút sao chép để copy thông tin thẻ."
                                }), (0,
                                s.jsxs)("div", {
                                    className: "bg-blue-50 border-l-4 border-blue-400 p-4 mb-6",
                                    children: [(0,
                                    s.jsx)("p", {
                                        className: "font-medium",
                                        children: "Hướng dẫn sử dụng:"
                                    }), (0,
                                    s.jsxs)("ol", {
                                        className: "list-decimal pl-6 mt-2 space-y-2",
                                        children: [(0,
                                        s.jsx)("li", {
                                            children: "Nhấn nút sao chép bên cạnh thông tin thẻ"
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: ["Truy cập ", (0,
                                            s.jsx)("a", {
                                                href: "https://cursor.com",
                                                className: "text-blue-600 hover:underline",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                children: "https://cursor.com"
                                            }), " "]
                                        }), (0,
                                        s.jsx)("li", {
                                            children: "Khi được yêu cầu thông tin thẻ, nhập thông tin đã sao chép theo định dạng: Số thẻ | Tháng hết hạn | Năm hết hạn | CVV"
                                        }), (0,
                                        s.jsx)("li", {
                                            children: "Hoàn tất đăng ký và sử dụng Cursor"
                                        })]
                                    })]
                                }), (0,
                                s.jsxs)("div", {
                                    className: "mb-8",
                                    children: [(0,
                                    s.jsx)("h3", {
                                        className: "text-xl font-semibold mb-3",
                                        children: "Hướng dẫn nhập thông tin thẻ"
                                    }), (0,
                                    s.jsx)("div", {
                                        className: "border border-gray-200 rounded-lg p-4 shadow-sm",
                                        children: (0,
                                        s.jsx)(a.default, {
                                            src: "/huongdanaddthe.png",
                                            alt: "Hướng dẫn nhập thông tin thẻ",
                                            width: 400,
                                            height: 500,
                                            className: "rounded-lg w-[400px] h-[500px]"
                                        })
                                    })]
                                }), (0,
                                s.jsxs)("div", {
                                    className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6",
                                    children: [(0,
                                    s.jsx)("p", {
                                        className: "font-medium",
                                        children: "Lưu ý quan trọng:"
                                    }), (0,
                                    s.jsxs)("p", {
                                        className: "mt-2",
                                        children: ["Nếu thẻ ảo có sẵn không hoạt động, bạn có thể ", (0,
                                        s.jsx)("button", {
                                            onClick: () => n("the-ao"),
                                            className: "text-blue-600 hover:underline font-medium",
                                            children: "tạo thẻ ảo Timo"
                                        }), " của riêng mình."]
                                    }), (0,
                                    s.jsx)("div", {
                                        className: "mt-4 flex justify-center",
                                        children: (0,
                                        s.jsx)("button", {
                                            onClick: () => N(!1),
                                            className: "flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition-colors disabled:bg-gray-400",
                                            title: "Tạo thẻ mới",
                                            disabled: u,
                                            children: u ? (0,
                                            s.jsxs)(s.Fragment, {
                                                children: [(0,
                                                s.jsx)(r.A, {
                                                    className: "h-4 w-4 mr-2 animate-spin"
                                                }), " Đang tạo thẻ..."]
                                            }) : (0,
                                            s.jsxs)(s.Fragment, {
                                                children: [(0,
                                                s.jsx)(r.A, {
                                                    className: "h-4 w-4 mr-2"
                                                }), " Tạo thẻ mới"]
                                            })
                                        })
                                    })]
                                }), (0,
                                s.jsx)("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6",
                                    children: j.map( (e, n) => (0,
                                    s.jsx)("div", {
                                        className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow",
                                        children: (0,
                                        s.jsxs)("div", {
                                            className: "flex justify-between items-start",
                                            children: [(0,
                                            s.jsxs)("div", {
                                                children: [(0,
                                                s.jsxs)("p", {
                                                    className: "font-medium",
                                                    children: ["Thẻ #", n + 1]
                                                }), (0,
                                                s.jsxs)("p", {
                                                    className: "text-sm text-gray-500 mt-1",
                                                    children: ["Số thẻ: ", y(e.number)]
                                                }), (0,
                                                s.jsxs)("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: ["Hết hạn: ", e.expMonth, "/", e.expYear]
                                                }), (0,
                                                s.jsxs)("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: ["CVV: ", k()]
                                                })]
                                            }), (0,
                                            s.jsx)("button", {
                                                onClick: () => v(n),
                                                className: "flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 transition-colors",
                                                title: "Sao chép thông tin thẻ",
                                                children: t === n ? (0,
                                                s.jsx)(i.A, {
                                                    className: "h-5 w-5"
                                                }) : (0,
                                                s.jsx)(h.A, {
                                                    className: "h-5 w-5"
                                                })
                                            })]
                                        })
                                    }, n))
                                }), (0,
                                s.jsxs)("div", {
                                    className: "mt-8",
                                    children: [(0,
                                    s.jsx)("h3", {
                                        className: "text-xl font-semibold mb-3",
                                        children: "Đăng ký Cursor Free Trial"
                                    }), (0,
                                    s.jsxs)("ol", {
                                        className: "list-decimal pl-6 space-y-3",
                                        children: [(0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Truy cập trang đăng ký Cursor"
                                            }), (0,
                                            s.jsxs)("p", {
                                                children: ["Vào website ", (0,
                                                s.jsx)("a", {
                                                    href: "https://cursor.com",
                                                    className: "text-blue-600 hover:underline",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    children: "https://cursor.com"
                                                }), " "]
                                            })]
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Nhập thông tin thẻ ảo"
                                            }), (0,
                                            s.jsx)("p", {
                                                children: "Khi được yêu cầu thông tin thanh toán, nhập thông tin thẻ ảo đã sao chép."
                                            })]
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Hoàn tất đăng ký"
                                            }), (0,
                                            s.jsx)("p", {
                                                children: "Xác nhận đăng ký và bắt đầu sử dụng Cursor với gói dùng thử miễn phí."
                                            })]
                                        })]
                                    })]
                                })]
                            })
                        }), "the-ao" === e && (0,
                        s.jsxs)(s.Fragment, {
                            children: [(0,
                            s.jsxs)("section", {
                                children: [(0,
                                s.jsx)("h2", {
                                    className: "text-2xl font-semibold mb-3 text-gray-800",
                                    children: "Tại sao cần thẻ ảo?"
                                }), (0,
                                s.jsx)("p", {
                                    className: "mb-2",
                                    children: "Cursor yêu cầu thông tin thẻ tín dụng khi đăng ký dùng thử miễn phí. Sử dụng thẻ ảo giúp bạn:"
                                }), (0,
                                s.jsxs)("ul", {
                                    className: "list-disc pl-6 space-y-1",
                                    children: [(0,
                                    s.jsx)("li", {
                                        children: "Bảo vệ thông tin tài chính cá nhân"
                                    }), (0,
                                    s.jsx)("li", {
                                        children: "Tránh bị trừ tiền tự động khi hết hạn dùng thử"
                                    }), (0,
                                    s.jsx)("li", {
                                        children: "Dễ dàng hủy đăng ký khi không muốn tiếp tục sử dụng"
                                    })]
                                })]
                            }), (0,
                            s.jsxs)("section", {
                                children: [(0,
                                s.jsx)("h2", {
                                    className: "text-2xl font-semibold mb-3 text-gray-800",
                                    children: "Cách tạo thẻ ảo Timo"
                                }), (0,
                                s.jsxs)("div", {
                                    className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4",
                                    children: [(0,
                                    s.jsx)("p", {
                                        className: "font-medium",
                                        children: "Lưu ý quan trọng:"
                                    }), (0,
                                    s.jsx)("p", {
                                        children: "Thẻ ảo Timo chỉ nên dùng để đăng ký, KHÔNG nạp tiền vào thẻ này để tránh bị trừ tiền khi hết hạn dùng thử."
                                    })]
                                }), (0,
                                s.jsxs)("ol", {
                                    className: "list-decimal pl-6 space-y-3",
                                    children: [(0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Đăng ký tài khoản Timo"
                                        }), (0,
                                        s.jsx)("p", {
                                            children: "Tải ứng dụng Timo từ App Store hoặc Google Play và đăng ký tài khoản mới."
                                        })]
                                    }), (0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Xác thực tài khoản"
                                        }), (0,
                                        s.jsx)("p", {
                                            children: "Hoàn thành quy trình xác thực danh tính theo hướng dẫn của Timo."
                                        })]
                                    }), (0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Tạo thẻ ảo"
                                        }), (0,
                                        s.jsx)("p", {
                                            children: 'Trong ứng dụng Timo, chọn mục "Thẻ" → "Tạo thẻ ảo" và làm theo hướng dẫn.'
                                        })]
                                    }), (0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Sử dụng thông tin thẻ"
                                        }), (0,
                                        s.jsx)("p", {
                                            children: "Sau khi tạo thẻ, bạn sẽ nhận được thông tin thẻ bao gồm số thẻ, ngày hết hạn và mã CVV để sử dụng khi đăng ký Cursor."
                                        })]
                                    })]
                                })]
                            }), (0,
                            s.jsxs)("section", {
                                children: [(0,
                                s.jsx)("h2", {
                                    className: "text-2xl font-semibold mb-3 text-gray-800",
                                    children: "Đăng ký Cursor Free Trial"
                                }), (0,
                                s.jsxs)("ol", {
                                    className: "list-decimal pl-6 space-y-3",
                                    children: [(0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Truy cập trang đăng ký Cursor"
                                        }), (0,
                                        s.jsxs)("p", {
                                            children: ["Vào website ", (0,
                                            s.jsx)("a", {
                                                href: "https://cursor.com",
                                                className: "text-blue-600 hover:underline",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                children: "https://cursor.com"
                                            }), " "]
                                        })]
                                    }), (0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Nhập thông tin thẻ ảo"
                                        }), (0,
                                        s.jsx)("p", {
                                            children: "Khi được yêu cầu thông tin thanh toán, nhập đầy đủ thông tin thẻ ảo Timo đã tạo."
                                        })]
                                    }), (0,
                                    s.jsxs)("li", {
                                        children: [(0,
                                        s.jsx)("p", {
                                            className: "font-medium",
                                            children: "Hoàn tất đăng ký"
                                        }), (0,
                                        s.jsx)("p", {
                                            children: "Xác nhận đăng ký và bắt đầu sử dụng Cursor với gói dùng thử miễn phí."
                                        })]
                                    })]
                                })]
                            }), (0,
                            s.jsxs)("section", {
                                children: [(0,
                                s.jsx)("h2", {
                                    className: "text-2xl font-semibold mb-3 text-gray-800",
                                    children: "Hủy đăng ký trước khi hết hạn dùng thử"
                                }), (0,
                                s.jsx)("p", {
                                    className: "mb-2",
                                    children: "Để tránh bị tính phí sau khi hết thời gian dùng thử:"
                                }), (0,
                                s.jsxs)("ol", {
                                    className: "list-decimal pl-6 space-y-2",
                                    children: [(0,
                                    s.jsx)("li", {
                                        children: "Đăng nhập vào tài khoản Cursor của bạn"
                                    }), (0,
                                    s.jsx)("li", {
                                        children: 'Vào phần "Account Settings" hoặc "Billing"'
                                    }), (0,
                                    s.jsx)("li", {
                                        children: 'Chọn "Cancel Subscription" hoặc "Cancel Free Trial"'
                                    }), (0,
                                    s.jsx)("li", {
                                        children: "Làm theo các bước để xác nhận hủy đăng ký"
                                    })]
                                })]
                            })]
                        }), "reset-trial" === e && (0,
                        s.jsx)(s.Fragment, {
                            children: (0,
                            s.jsxs)("section", {
                                children: [(0,
                                s.jsx)("h2", {
                                    className: "text-2xl font-semibold mb-3 text-gray-800",
                                    children: "Reset Trial Cursor"
                                }), (0,
                                s.jsx)("p", {
                                    className: "mb-4",
                                    children: "Khi bạn đã sử dụng hết thời gian dùng thử của Cursor, có hai cách để tiếp tục sử dụng:"
                                }), (0,
                                s.jsxs)("div", {
                                    className: "bg-blue-50 border-l-4 border-blue-400 p-4 mb-6",
                                    children: [(0,
                                    s.jsx)("p", {
                                        className: "font-medium",
                                        children: "Cách 1: Đăng xuất và đăng nhập với tài khoản khác"
                                    }), (0,
                                    s.jsx)("p", {
                                        className: "mt-2",
                                        children: "Nếu gặp lỗi thông thường, bạn chỉ cần đăng xuất tài khoản hiện tại và đăng nhập bằng một tài khoản khác là có thể sử dụng được Cursor."
                                    })]
                                }), (0,
                                s.jsxs)("div", {
                                    className: "bg-red-50 border-l-4 border-red-400 p-4 mb-6",
                                    children: [(0,
                                    s.jsx)("p", {
                                        className: "font-medium",
                                        children: "Cách 2: Reset Machine ID khi gặp lỗi giới hạn dùng thử"
                                    }), (0,
                                    s.jsx)("p", {
                                        className: "mt-2",
                                        children: "Nếu bạn gặp lỗi sau:"
                                    }), (0,
                                    s.jsx)("div", {
                                        className: "bg-gray-100 p-3 rounded my-3 text-sm font-mono",
                                        children: '"Too many free trial accounts used on this machine. Please upgrade to pro. We have this limit in place to prevent abuse. Please let us know if you believe this is a mistake. (Request ID: 76d5aaef-f10f-4c9f-a407-a51736126939)"'
                                    }), (0,
                                    s.jsx)("p", {
                                        children: "Bạn cần thực hiện reset Machine ID bằng cách:"
                                    })]
                                }), (0,
                                s.jsxs)("div", {
                                    className: "border border-gray-200 rounded-lg p-5 mb-6",
                                    children: [(0,
                                    s.jsx)("h3", {
                                        className: "text-xl font-semibold mb-4",
                                        children: "Hướng dẫn Reset Machine ID"
                                    }), (0,
                                    s.jsxs)("ol", {
                                        className: "list-decimal pl-6 space-y-4",
                                        children: [(0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Truy cập công cụ Reset"
                                            }), (0,
                                            s.jsxs)("p", {
                                                children: ["Vào website ", (0,
                                                s.jsx)("a", {
                                                    href: "https://cusor-gen.pages.dev/",
                                                    className: "text-blue-600 hover:underline",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    children: "https://cusor-gen.pages.dev/"
                                                })]
                                            })]
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Đóng ứng dụng Cursor"
                                            }), (0,
                                            s.jsx)("p", {
                                                className: "text-red-600 font-medium",
                                                children: "QUAN TRỌNG: Bạn phải đóng hoàn toàn ứng dụng Cursor trước khi chạy công cụ Reset để tránh lỗi!"
                                            })]
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Chạy công cụ"
                                            }), (0,
                                            s.jsx)("p", {
                                                children: 'Chọn tùy chọn số 1 để "Reset Machine ID"'
                                            })]
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Khởi động lại Cursor"
                                            }), (0,
                                            s.jsx)("p", {
                                                children: "Sau khi reset thành công, khởi động lại ứng dụng Cursor"
                                            })]
                                        }), (0,
                                        s.jsxs)("li", {
                                            children: [(0,
                                            s.jsx)("p", {
                                                className: "font-medium",
                                                children: "Đăng nhập lại"
                                            }), (0,
                                            s.jsx)("p", {
                                                children: "Đăng nhập với tài khoản của bạn hoặc tạo tài khoản mới"
                                            })]
                                        })]
                                    })]
                                }), (0,
                                s.jsxs)("div", {
                                    className: "bg-yellow-50 border-l-4 border-yellow-400 p-4",
                                    children: [(0,
                                    s.jsx)("p", {
                                        className: "font-medium",
                                        children: "Lưu ý quan trọng:"
                                    }), (0,
                                    s.jsx)("p", {
                                        className: "mt-2",
                                        children: "Việc reset Machine ID chỉ nên thực hiện khi thực sự cần thiết và bạn không thể sử dụng Cursor bằng cách thông thường."
                                    }), (0,
                                    s.jsxs)("p", {
                                        className: "mt-2 text-red-600",
                                        children: [(0,
                                        s.jsx)(l.A, {
                                            className: "inline-block mr-1 h-5 w-5"
                                        }), " Đảm bảo đã thoát hoàn toàn ứng dụng Cursor trước khi chạy công cụ Reset, nếu không có thể gây ra lỗi không mong muốn."]
                                    })]
                                })]
                            })
                        }), (0,
                        s.jsxs)("div", {
                            className: "bg-blue-50 border-l-4 border-blue-400 p-4 mt-6",
                            children: [(0,
                            s.jsx)("p", {
                                className: "font-medium",
                                children: "Hỗ trợ kỹ thuật:"
                            }), (0,
                            s.jsxs)("p", {
                                children: ["Nếu gặp khó khăn trong quá trình đăng ký hoặc sử dụng, vui lòng liên hệ với chúng tôi qua ", (0,
                                s.jsx)("a", {
                                    href: "https://t.me/saitama_b",
                                    className: "text-blue-600 hover:underline",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: "Telegram"
                                }), " để được hỗ trợ."]
                            })]
                        })]
                    })]
                })
            })
        }
    }
}, e => {
    var n = n => e(e.s = n);
    e.O(0, [8258, 582, 6824, 9248, 5745, 6276, 8704, 2510, 2313, 8889, 3283, 3305, 4288, 7706, 5651, 9082, 9514, 1561, 6867, 8460, 7358], () => n(2851)),
    _N_E = e.O()
}
]);