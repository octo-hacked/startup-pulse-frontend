import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Mail, User, Briefcase, CheckCircle, Key } from "lucide-react";
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';



interface FormData {
  name: string;
  email: string;
  password?: string;
  role: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}


const Signup = () => {
  const {backendUrl, navigate, setToken} = useAppContext();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate account creation
    setTimeout(async() => {
      try {
        const response = await axios.post(backendUrl+'/api/user/register', formData)
        if (response.data.success) {
          // Handle successful account creation
          setIsSubmitting(false);
          setIsSuccess(true);
          setToken(response.data.token); // Store token in context
          toast.success("Account created successfully!");
          navigate('/login'); // Redirect to login page after successful signup
        } else {
          // Handle error from server
          toast.error(response.data.message || "Failed to create account. Please try again.");
          setIsSubmitting(false);
          return;
        }
        
      } catch (error) {
        toast.error("An error occurred while creating your account. Please try again.");
      }
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-500 border-blue-200 shadow-blue-100/50">
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-200">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Welcome aboard!</h2>
            <p className="text-blue-700 mb-6">Your account has been created successfully.</p>
            <Button 
              onClick={() => window.location.href = '/'} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md animate-in fade-in-0 slide-in-from-left-10 duration-500 border-blue-200 shadow-blue-100/50">
        <CardHeader className="bg-blue-50 rounded-t-lg border-b border-blue-100">
          <CardTitle className="text-2xl font-bold text-center text-blue-900">Create Account</CardTitle>
          <CardDescription className="text-center text-blue-700">
            Join us today! Fill in your details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-900">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`pl-10 transition-all duration-200 border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500 animate-in slide-in-from-left-2">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 transition-all duration-200 border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 animate-in slide-in-from-left-2">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900">Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 transition-all duration-200 border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 animate-in slide-in-from-left-2">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-blue-900">Role</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-blue-500 z-10" />
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger className={`pl-10 transition-all duration-200 border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${errors.role ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-blue-200">
                    <SelectItem value="developer" className="hover:bg-blue-50">StartUp</SelectItem>
                    <SelectItem value="designer" className="hover:bg-blue-50">Student</SelectItem>
                    <SelectItem value="manager" className="hover:bg-blue-50">Mentor</SelectItem>
                    <SelectItem value="student" className="hover:bg-blue-50">Mentee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.role && <p className="text-sm text-red-500 animate-in slide-in-from-left-2">{errors.role}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full transition-all duration-200 hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-700 text-white" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors underline">
                Sign in here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
