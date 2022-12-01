import ErrorImgLogo from '../assets/errorpage.jpg';

function FallBackUI() {
    return (
        <>
            {/* <Grid container spacing={2} className="flex align-middle">
                <Grid item xs={12} sm={12} md={12} lg={12} className="flex w-full justify-center">
                    <img src={ErrorImgLogo} className="w-6/12" alt="Error Page" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className="flex w-full justify-center">
                    <h1 className='text-center text-gray-600 text-3xl'>Something went wrong!</h1>
                </Grid>
            </Grid> */}
            <div className="grid grid-cols-2 gap-2 align-middle">
                <div className="flex w-full justify-center">
                    <img src={ErrorImgLogo} className="w-6/12" alt="Error Page" />
                </div>
                <div className="flex w-full justify-center">
                    <h1 className='text-center text-gray-600 text-3xl'>Something went wrong!</h1>
                </div>
            </div>
        </>
    )
}

export default FallBackUI;
