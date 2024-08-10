// src/components/DashProfile.js
import { Button, TextInput } from 'flowbite-react';
import React from 'react';

function DashProfile() {
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img src="banner.png" alt="user" className="rounded-full w-full h-full object-cover border-8 border-gray-400"/>
        </div>
        <TextInput type="text" id="username" placeholder="Username" />
        <TextInput type="email" id="email" placeholder="Email" />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button type="submit" className="bg-[--primary-color] text-white hover:bg-[--button-color]">
          Update
        </Button>
      </form>
    </div>
  );
}

export default DashProfile;
