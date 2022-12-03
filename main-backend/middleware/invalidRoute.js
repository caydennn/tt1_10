export default (req, res) => (
    res.status(404).json(
        {
            "success": false,
            "status": 404,
            "message": "Invalid Request"
        }
    )
)