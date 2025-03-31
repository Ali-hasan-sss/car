"use client";

import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Edit, Lock, Trash } from "lucide-react";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userData, setUserData] = useState(user || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userId =
          user?.id || JSON.parse(localStorage.getItem("user") || "{}").id;
        if (userId) {
          const response = await axios.get(`/api/users/${userId}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setUserData(user);
      // fetchUserDetails();
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        fetchUserDetails();
      }
    }
  }, [user]);

  if (!userData || loading) return <CircularProgress />;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={5}>
      <Card sx={{ width: 700, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Avatar sx={{ width: 80, height: 80 }}>
              {userData.first_name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{`${userData.first_name} ${userData.last_name}`}</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>
            <Typography variant="body2">
              رقم الهاتف: {userData.contact?.mobile || "غير متوفر"}
            </Typography>
            <Typography variant="body2">
              نوع المستخدم: {userData.userRole}
            </Typography>
          </Box>

          {/* صورة الهوية */}
          {userData.idDetail?.id_file && (
            <Box display="flex" justifyContent="center" mt={2}>
              <img
                src={userData.idDetail.id_file}
                alt="هوية المستخدم"
                style={{ width: "400px", borderRadius: "8px" }}
              />
            </Box>
          )}

          {/* عرض جميع البيانات */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={6}>
              <Typography variant="body2">
                العنوان: {userData.contact?.address1 || "غير متوفر"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                المدينة: {userData.contact?.city || "غير متوفر"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                الرمز البريدي: {userData.contact?.zip_code || "غير متوفر"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                رقم الهوية: {userData.idDetail?.id_number || "غير متوفر"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                الرقم الضريبي: {userData.idDetail?.tax_info || "غير متوفر"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {userData.created_at && (
                <Typography variant="body2">
                  تاريخ الإنشاء:{" "}
                  {new Date(userData.created_at).toLocaleDateString()}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* أزرار التحكم */}
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="contained" color="primary" startIcon={<Edit />}>
              تعديل
            </Button>
            <Button variant="contained" color="secondary" startIcon={<Lock />}>
              تغيير كلمة المرور
            </Button>
            <Button variant="contained" color="error" startIcon={<Trash />}>
              حذف الحساب
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
