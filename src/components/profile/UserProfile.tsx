import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Save,
  Upload,
} from "lucide-react";

interface ProfileData {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    phone: "",
    address: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data");
        return;
      }

      if (data) {
        setProfileData(data as ProfileData);
        setFormData({
          full_name: data.full_name || "",
          username: data.username || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return null;

    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("user-avatars")
      .upload(filePath, avatarFile);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      throw uploadError;
    }

    return filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      let avatarUrl = profileData?.avatar_url;

      // Upload new avatar if selected
      if (avatarFile) {
        avatarUrl = await uploadAvatar();
      }

      // Update profile
      const { error: updateError } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: formData.full_name,
        username: formData.username,
        avatar_url: avatarUrl,
        phone: formData.phone,
        address: formData.address,
        updated_at: new Date().toISOString(),
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccessMessage("Profile updated successfully!");
      fetchProfile(); // Refresh profile data
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-3xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
          <CardDescription>
            Manage your account information and preferences
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 p-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={
                      avatarPreview ||
                      profileData?.avatar_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                    }
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center">
                  <Label
                    htmlFor="avatar"
                    className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md flex items-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      value={user.email || ""}
                      disabled
                      className="pl-10 bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St, City, State, ZIP"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="account" className="space-y-4 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Security</h3>

              <div className="space-y-2">
                <Label>Email Verification</Label>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${user.email_confirmed_at ? "bg-green-500" : "bg-yellow-500"}`}
                  ></div>
                  <span>
                    {user.email_confirmed_at ? "Verified" : "Not verified"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/reset-password")}
                >
                  Change Password
                </Button>
              </div>

              <div className="pt-4 border-t mt-4">
                <h3 className="text-lg font-medium mb-2">
                  Account Information
                </h3>
                <p className="text-sm text-gray-500">
                  Member since:{" "}
                  {new Date(profileData?.created_at || "").toLocaleDateString()}
                </p>
              </div>

              <div className="pt-4 border-t mt-4">
                <h3 className="text-lg font-medium text-red-600 mb-2">
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserProfile;
