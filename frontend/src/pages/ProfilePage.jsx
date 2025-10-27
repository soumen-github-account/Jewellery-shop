import React, { useContext, useState, useEffect } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BottomNav from "../AppComponents/BottomNav";
import Navbar2 from "../AppComponents/Navbar2";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, loadingUser, backendUrl, setUser } = useContext(AppContext);
  const [editableUser, setEditableUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false)

  // Copy context user into local editable state
  useEffect(() => {
    if (user) {
      setEditableUser({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        picture: user.picture || "",
        addresses: user.addresses || [
          { id: 1, label: "Home", address: "" },
        ],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (id, value) => {
    setEditableUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) =>
        addr.id === id ? { ...addr, address: value } : addr
      ),
    }));
  };

  const addAddress = () => {
    const newId = editableUser.addresses.length
      ? editableUser.addresses[editableUser.addresses.length - 1].id + 1
      : 1;
    setEditableUser({
      ...editableUser,
      addresses: [
        ...editableUser.addresses,
        { id: newId, label: "New Address", address: "" },
      ],
    });
  };

  const removeAddress = (id) => {
    setEditableUser({
      ...editableUser,
      addresses: editableUser.addresses.filter((addr) => addr.id !== id),
    });
  };

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await axios.put(
        `${backendUrl}/auth/update-user`,
        editableUser,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
        setLoading(false)
      }
    } catch (err) {
      console.error(err);
      toast.alert("Failed to update profile");
    }
  };

  // const handleLogout = () => {
  //   window.open(`${backendUrl}/auth/logout`, "_self");
  //   toast.success("logout successfull")
  // };

  const handleLogout = async () => {
    await axios.get(`${backendUrl}/auth/logout`, { withCredentials: true });
    setUser(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logout successful");
  };


  if (loadingUser || !editableUser) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-gray-600 mb-4">You are not logged in.</p>
        <button
          onClick={() => window.open(`${backendUrl}/auth/google`, "_self")}
          className="bg-[#7C573B] text-white px-6 py-2 rounded-lg hover:bg-[#a37b55]"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50 p-5 pb-20 pt-15">
        <h1 className="text-2xl font-bold mb-6 text-[#7C573B] flex justify-between items-center">
          My Profile
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center text-sm text-[#7C573B] hover:text-[#a37b55]"
            >
              <AiOutlineEdit className="mr-1" /> Edit
            </button>
          )}
        </h1>

        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {editableUser.picture ? (
                <img
                  src={editableUser.picture}
                  alt=''
                  className="w-full h-full object-cover"
                />
              ) : (
                <MdOutlineAccountCircle className="text-gray-400 text-5xl" />
              )}
            </div>
            <p className="mt-2 font-semibold text-lg">{editableUser.name}</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleChange}
                readOnly={!editMode}
                className={`w-full px-4 py-2 border rounded-lg ${
                  editMode
                    ? "focus:outline-none focus:ring-2 focus:ring-[#7C573B]"
                    : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editableUser.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={editableUser.phone}
                onChange={handleChange}
                readOnly={!editMode}
                className={`w-full px-4 py-2 border rounded-lg ${
                  editMode
                    ? "focus:outline-none focus:ring-2 focus:ring-[#7C573B]"
                    : "bg-gray-100"
                }`}
              />
            </div>

            {/* Addresses Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-600 font-semibold">
                  Addresses
                </label>
                {editMode && (
                  <button
                    type="button"
                    onClick={addAddress}
                    className="flex items-center text-sm text-[#7C573B] hover:text-[#a37b55] transition"
                  >
                    <AiOutlinePlus className="mr-1" /> Add
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {editableUser.addresses.map((addr) => (
                  <div key={addr.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={addr.address}
                      onChange={(e) =>
                        handleAddressChange(addr.id, e.target.value)
                      }
                      readOnly={!editMode}
                      className={`flex-1 px-3 py-2 border rounded-lg ${
                        editMode
                          ? "focus:outline-none focus:ring-2 focus:ring-[#7C573B]"
                          : "bg-gray-100"
                      }`}
                      placeholder={addr.label}
                    />
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => removeAddress(addr.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {editMode ? (
              <button
                type="button"
                disabled={loading}
                onClick={handleSave}
                className="w-full bg-[#7C573B] text-white py-2 rounded-lg hover:bg-[#a37b55] transition-colors"
              >
                {loading ?  "Please Wait..." : "Save Changes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </form>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default ProfilePage;
