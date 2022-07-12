// 校验规则

// 账号
export function username(fields, value, cb) {
    // 用户名2~6位字母数字下划线, 空时为 undefine 的字符串，此时为真。
    if (!value || !/^\w{2,20}$/.test(value)) {
        return cb(new Error("用户名为2 ~ 8字母数字下划线组成"))
    }
    cb();
}

// 密码
export function password(fields, value, cb) {
    // 密码要包含数字和字母
    if (!/\d.*[a-zA-Z]|[a-zA-Z].*\d/.test(value)) {
        return cb(new Error('密码要包含字母和数字'))
    }
    cb();
}

// 重复密码
export function repeat(password, name, fields, value, cb) {
    if (value && value === password) {
        return cb();
    }
    // 不满足时
    cb(new Error(`重复${name} 和${name}不同，请重新输入`));
}
// 必填
export function required(fields, value, cb) {
    if (value === '' || value === undefined) {
        return cb(new Error('请输入内容！'));

    }
    cb();
}

// 手机号
export function telephone(fields, value, cb) {
    if (!/^1\d{10}$/.test(value)) {
        return cb(new Error('请输入正确的手机号码！'));
    }
    cb();
}

// 暴漏数据
export default { username, password, required, telephone, repeat }