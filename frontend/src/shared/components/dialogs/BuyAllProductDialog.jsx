import React, { useState } from "react";
import { 
    useBuyAllProductsMutation, 
    useCustomerDetailsQuery, 
    useAddAddressMutation 
} from "../../../shared";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField,
    Stack,
    Alert,
    CircularProgress
} from "@mui/material";

export const BuyAllDialog = ({ open, onClose, products, onSuccess }) => {

    const [buyAllProducts, { isLoading: isBuying }] = useBuyAllProductsMutation();
    const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
    const { data } = useCustomerDetailsQuery();
    
    const isLoading = isBuying || isAddingAddress;

    const [paymentType, setPaymentType] = useState("credit_card");
    const [installments, setInstallments] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState({
        address_line: '',
        city: '',
        state: '',
        zip_code: '',
    });
    const [message, setMessage] = useState('');

    const formatAddress = (addr) => {
        return `${addr.address_line}, ${addr.city}, ${addr.state} - ${addr.zip_code}`;
    };

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const totalAmount = products?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleSubmit = async () => {
        const uid = localStorage.getItem("user_id");
        if (!uid) {
            setMessage("Session expired. Please log in again.");
            return;
        }

        let finalAddress;

        if (selectedAddress === 'new') {
            const { address_line, city, state, zip_code } = newAddress;

            if (!address_line || !city || !state || !zip_code) {
                setMessage('Please fill all address fields');
                return;
            }

            try {
                await addAddress({ uid: uid, data: newAddress }).unwrap();
                finalAddress = newAddress;
            } catch (err) {
                console.error('Failed to add address:', err);
                setMessage('Failed to save address. Please try again.');
                return;
            }
        } else {
            if (!selectedAddress) {
                setMessage('Please select an address');
                return;
            }

            try {
                finalAddress = JSON.parse(selectedAddress);
            } catch (e) {
                setMessage("Invalid address selection.");
                return;
            }
        }

        try {
            const payload = {
                customer_id: uid,
                payment_type: paymentType,
                payment_installments: Number(installments),
                address: finalAddress,
                items: products.map(item => ({
                    product_id: Array.isArray(item.product_id)
                        ? item.product_id[0]
                        : item.product_id,
                    quantity: item.quantity
                }))
            };
            
            await buyAllProducts(payload).unwrap();
            setMessage("Bulk purchase successful!");

            if (onSuccess) onSuccess();
            
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err) {
            console.error("Buy all failed", err);
            setMessage(err?.data?.message || "Purchase failed. Please try again.");
        }
    };

    return (
        <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: (theme) => theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(20, 28, 30, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        }
      }}
    >
            <DialogTitle>Buy All Products</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>

                    {message && <Alert severity={message.includes("successful") ? 'success' : 'error'}>{message}</Alert>}

                    <Alert severity="info">
                        Total Items: {products?.length}
                        <br />
                        Total Amount: ₹{totalAmount?.toFixed(2)}
                    </Alert>

                    <TextField
                        select
                        label="Payment Type"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="credit_card">Credit Card</MenuItem>
                        <MenuItem value="debit_card">Debit Card</MenuItem>
                        <MenuItem value="boleto">Boleto</MenuItem>
                        <MenuItem value="voucher">Voucher</MenuItem>
                    </TextField>

                    <TextField
                        label="Installments"
                        type="number"
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        fullWidth
                        disabled={paymentType !== "credit_card"}
                    />

                    <TextField
                        select
                        label="Select Address"
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        fullWidth
                    >
                        {data?.addresses?.map((addr, index) => {
                            const fullAddress = formatAddress(addr);
                            return (
                                <MenuItem key={index} value={JSON.stringify(addr)}>
                                    {fullAddress}
                                </MenuItem>
                            );
                        })}

                        <MenuItem value="new">+ Add New Address</MenuItem>
                    </TextField>

                    {selectedAddress === 'new' && (
                        <>
                            <TextField
                                label="Address Line"
                                name="address_line"
                                value={newAddress.address_line}
                                onChange={handleNewAddressChange}
                                fullWidth
                            />

                            <TextField
                                label="City"
                                name="city"
                                value={newAddress.city}
                                onChange={handleNewAddressChange}
                                fullWidth
                            />

                            <TextField
                                label="State"
                                name="state"
                                value={newAddress.state}
                                onChange={handleNewAddressChange}
                                fullWidth
                            />

                            <TextField
                                label="Zip Code"
                                name="zip_code"
                                value={newAddress.zip_code}
                                onChange={handleNewAddressChange}
                                fullWidth
                            />
                        </>
                    )}

                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="error" variant="contained" disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isLoading || message.includes("successful")}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                    {isLoading ? "Processing..." : "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
