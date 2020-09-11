validateRole = (roles) => {
    token = 'admin'
    console.log(roles)
    roles.map((r) => {
        if (r === token) {
            console.log('haha')
            return true
        }
    })
    console.log('sasa')

}
validateRole(['admin', 'operator'])