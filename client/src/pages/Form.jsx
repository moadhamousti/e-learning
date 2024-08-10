// src/components/Form.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';

function Form() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [localisation, setLocalisation] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/form', {
                firstName,
                lastName,
                phoneNumber,
                email,
                localisation
            });

            console.log('Form submitted successfully:', response.data);
            
            // Show success toast
            toast.success('Form Successfully Submitted', {
                icon: '🎉',
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                },
            });

            // Reset form fields
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
            setLocalisation('');

            // Redirect to /formation
            navigate('/formation');
        } catch (error) {
            console.error('Error submitting form:', error);

            // Show error toast
            toast.error('Error submitting form. Please try again.', {
                icon: '🚫',
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                },
            });
        }
    };

    return (
        <>
            <Navbar />
            <h2 className="text-6xl font-bold mb-2 text-center p-10 text-[--button-color]">Please Fill Up The Form</h2>
            <div className="w-full flex items-center justify-center bg-white">
                <form className="w-full flex flex-col justify-center lg:max-w-3xl p-8" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-gray-700 font-medium mb-2">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            className="w-full max-w-full px-4 py-2 border rounded-2xl focus:outline-none"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-6">
                        <label htmlFor="lastname" className="block text-gray-700 font-medium mb-2">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            className="w-full px-4 py-2 border rounded-2xl focus:outline-none"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label htmlFor="phonenumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            id="phonenumber"
                            className="w-full max-w-full px-4 py-2 border rounded-2xl focus:outline-none"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-2xl focus:outline-none"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Localisation */}
                    <div className="mb-6">
                        <label htmlFor="localisation" className="block text-gray-700 font-medium mb-2">Localisation</label>
                        <input
                            type="text"
                            id="localisation"
                            className="w-full px-4 py-2 border rounded-2xl focus:outline-none"
                            placeholder="Localisation"
                            value={localisation}
                            onChange={(e) => setLocalisation(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <input
                            type="submit"
                            className="w-4/5 bg-[--button-color] border-[3px] cursor-pointer border-transparent text-[--text-color] text-xl font-semibold py-2 px-4 rounded-2xl hover:bg-transparent hover:text-[--button-color] hover:border-[--button-color] focus:outline-none focus:bg-[--primary-color] focus:text-[--text-color]"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default Form;
