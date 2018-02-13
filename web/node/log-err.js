module.exports = (code, err) => {
    console.error(
        `----- =-=-=-=-=-=-=-=- ${code} -=-=-=-=-=-=-=-= -----`,
        "\n",
        new Error().stack,
        "\n",
        `----- ================ ${code} ================ -----`,
    )
}
