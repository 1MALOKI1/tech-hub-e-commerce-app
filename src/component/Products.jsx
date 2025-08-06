import { Alert, Button, Card, CardActions,
    CardContent, Fab, CardMedia, Container, Grid, Dialog, DialogContent, DialogActions, Box, TextField, 
    Snackbar, Typography, Backdrop, CircularProgress
 } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react'
import api from '../utils/axios'



export default function Products(){
    const [products, setProducts] = useState()
    const [admin, setAdmin] = useState(false)
    const [openFormCreate, setOpenFormCreate] = useState(false)
    const [openFormUpdate, setOpenFormUpdate] = useState(false)
    const [idProduct, setIdProduct] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({
        status:'',
        text:''
    })
    const [dataForm, setDataForm] = useState({
        name:'',
        description:'',
        price:0
    })

    useEffect(()=>{
        getData()
        getUserRole()

    },[])

    const handleOpenFormCreate = ()=>{
        setOpenFormCreate(true)
    }
    const handleCloseFormCreate = ()=>{
        setTimeout(() => {
            setDataForm({
                name:'',
                description:'',
                price:0
            })
        }, 500);
        setOpenFormCreate(false)
    }
    const handleOpenFormUpdate = (product) =>{
        let newData = {...dataForm}
        newData.name = product.name
        newData.price = product.price
        newData.description = product.description
        setDataForm(newData)
        setIdProduct(product.id)
        setOpenFormUpdate(true)
    }
    const handleCloseFormUpdate = ()=>{
        setTimeout(() => {
            setDataForm({
                name:'',
                description:'',
                price:0
            })
        }, 500);
        setOpenFormUpdate(false)
    }
    const getUserRole = ()=>{
        let userData = JSON.parse(localStorage.getItem('user'))
        if(userData.role === 'SUPER_ADMIN'){
            setAdmin(true)
        }
    }
    const getData = async ()=>{
        setIsLoading(true)
        try{
            const response = await api.get('/products?page=1&limit=10')
            if(response.data?.data){
                let data = response.data.data
                setProducts(data.data)
            }
        }catch(e){
            console.log(e)
            return (<Alert variant="filled" severity='error'>
                        No Data
                    </Alert>)
        }finally{
            setIsLoading(false)
        }
    }
    
    const createProduct = async ()=>{
        setIsLoading(true)
    
        try{
            const response = await api.post('/products', dataForm)
            if(response.status === 201){
                let newMessage = {...message}
                newMessage.status = "success"
                newMessage.text = "Created Was successfully!"
                setMessage(newMessage)
                getData()
            }
            else{
                let newMessage = {...message}
                newMessage.status = "error"
                newMessage.text = "Failed to Create Product"
                setMessage(newMessage)
            }
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
            setTimeout(()=>{
                let newMessage = {...message}
                newMessage.status = ""
                newMessage.text = ""
                setMessage(newMessage)
            },5000)
        }
    }

    const UpdateProduct = async ()=>{
        setIsLoading(true)
        try{
            const response = await api.put(`/products/${idProduct}`, dataForm)
            if(response.status === 200){
                let newMessage = {...message}
                newMessage.status = "success"
                newMessage.text = "Update Was successfully!"
                setMessage(newMessage)
                getData()
            }
            else{
                let newMessage = {...message}
                newMessage.status = "error"
                newMessage.text = "Failed to Update Product"
                setMessage(newMessage)
            }
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(true)
            setTimeout(()=>{
                let newMessage = {...message}
                newMessage.status = ""
                newMessage.text = ""
                setMessage(newMessage)
            },5000)
        }
    }

    const deleteProduct = async (id)=>{
        setIsLoading(true)
        try{
            const res = await api.delete(`products/${id}`)
            getData()
            
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(true)
        }
    }
    const handleSubmitUpdate = (e) =>{
        e.preventDefault();
        if(dataForm){
            UpdateProduct()
        }
        setIdProduct(null)
    }

    const handleSubmitCreate = (e) =>{
        e.preventDefault();
        if(dataForm){
            createProduct()
        }
    }
    const handleSetDataForm = (e)=>{
        let newData = {...dataForm}
        let currenKey = e.target.name.toLowerCase()
        if(currenKey === 'price'){
            newData[currenKey] = +e.target.value
        }
        else{
            newData[currenKey] = e.target.value
        }
        setDataForm(newData)
    }
    return(
        <Container maxWidth='lg' >
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {message.status && (
            <Alert variant="filled" severity={message.status}>
                {message.text}
            </Alert>
            )}
            <Grid container spacing={2} >
                {products?.map((product)=>(
                    <Grid sx={{m:'20px auto'}} key={product.id} size={{sm:12, md:6, lg:4}} >
                        <Card elevation={8} sx={{ width: 345, p:3 }} >
                            <CardMedia
                            component='image'
                            height='200'
                            />
                            <CardContent>
                                <Typography variant='h6' >
                                    {product.name}
                                </Typography>
                                <Typography variant='body2' >
                                    {product.description}
                                </Typography>
                                <Typography variant='h6' textAlign='end' sx={{color:'#305cd6ff'}} >
                                    {product.price}$
                                </Typography>
                            </CardContent>
                            <CardActions>
                                < Button variant='contained' fullWidth >
                                    Buy
                                </Button>
                            </CardActions>
                            {admin && (
                            <CardActions>
                                <Button onClick={()=> deleteProduct(product.id)} variant='outlined' color='error' fullWidth >
                                    Delete
                                </Button>
                                <Button onClick={()=> handleOpenFormUpdate(product)}

                                 variant='outlined' color='success' fullWidth >
                                    Update
                                </Button>
                                <Dialog onClose={handleCloseFormUpdate} open={openFormUpdate}>
                                    <DialogContent>
                                        <Box
                                        onSubmit={handleSubmitUpdate}
                                        component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, }, display:'flex', flexDirection:'column', }}
                                        >
                                            <TextField
                                            label="Name"
                                            required
                                            maxRows={4}
                                            variant="filled"
                                            name='name'
                                            defaultValue={dataForm.name}
                                            onChange={(e)=> handleSetDataForm(e)}
                                            />

                                            <TextField
                                            label="Price"
                                            variant="filled"
                                            required
                                            type='number'
                                            name='price'
                                            defaultValue={dataForm.price}
                                            onChange={(e)=> handleSetDataForm(e)}

                                            />

                                            <TextField
                                            id="filled-multiline-static"
                                            label="Description"
                                            required
                                            name='description'
                                            defaultValue={dataForm.description}
                                            onChange={(e)=> handleSetDataForm(e)}
                                            multiline
                                            rows={4}
                                            variant="filled"
                                            />
                                            <Button type='submit' onClick={handleCloseFormUpdate} variant='contained' >
                                                Update
                                            </Button>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>

                                    </DialogActions>
                                </Dialog>
                            </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {admin && (
                <Snackbar
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Fab
                    onClick={handleOpenFormCreate}
                        sx={(theme) => ({
                            position: 'absolute',
                            bottom: theme.spacing(2),
                            right: theme.spacing(2),
                        })}
                        >
                        <AddIcon />
                    </Fab>
                </Snackbar>
            )}
            <Dialog onClose={handleCloseFormCreate} open={openFormCreate}>
                <DialogContent>
                    <Box
                    onSubmit={handleSubmitCreate}
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, }, display:'flex', flexDirection:'column', }}
                    >
                        <TextField
                        label="Name"
                        required
                        maxRows={4}
                        variant="filled"
                        name='name'
                        defaultValue={dataForm.name}
                        onChange={(e)=> handleSetDataForm(e)}
                        />

                        <TextField
                        label="Price"
                        variant="filled"
                        required
                        type='number'
                        name='price'
                        defaultValue={dataForm.price}
                        onChange={(e)=> handleSetDataForm(e)}

                        />

                        <TextField
                        id="filled-multiline-static"
                        label="Description"
                        required
                        name='description'
                        defaultValue={dataForm.description}
                        onChange={(e)=> handleSetDataForm(e)}
                        multiline
                        rows={4}
                        variant="filled"
                        />
                        <Button type='submit' onClick={handleCloseFormCreate} variant='contained' >
                            Add
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
            
        </Container>
    )
}