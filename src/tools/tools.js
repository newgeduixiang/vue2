// 校验规则
export function username(fields, value, cb) {
    // 用户名2~6位字母数字下划线, 空时为 undefine 的字符串，此时为真。
    if (!value || !/^\w{2,20}$/.test(value)) {
        return cb(new Error("用户名为2 ~ 8字母数字下划线组成"))
    }
    cb();
}

export function password(fields, value, cb) {
    // 密码要包含数字和字母
    if (!/\d.*[a-zA-Z]|[a-zA-Z].*\d/.test(value)) {
        return cb(new Error('密码要包含字母和数字'))
    }
    cb();
}

// 暴漏数据
export default { username, password }