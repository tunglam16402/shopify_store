// "use client";

// import { useState } from "react";
// import { ZodSchema } from "zod";

// export type FormErrors<T> = Partial<Record<keyof T, string>>;

// export function useZodForm<T>(schema: ZodSchema<T>, initialValues: T) {
//   const [values, setValues] = useState<T>(initialValues);
//   const [errors, setErrors] = useState<FormErrors<T>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target as any;
//     setValues(prev => ({ ...prev, [name]: value }));

//     // clear error khi giá trị hợp lệ
//     try {
//       schema.pick({ [name]: true }).parse({ [name]: value });
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     } catch (err: any) {
//       // giữ nguyên lỗi nếu còn
//     }
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target as any;
//     try {
//       schema.pick({ [name]: true }).parse({ [name]: value });
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     } catch (err: any) {
//       setErrors(prev => ({ ...prev, [name]: err.errors[0]?.message || "Invalid" }));
//     }
//   };

//   const validateAll = (): boolean => {
//     try {
//       schema.parse(values);
//       setErrors({});
//       return true;
//     } catch (err: any) {
//       const formErrors: FormErrors<T> = {};
//       err.errors.forEach((e: any) => {
//         const field = e.path[0] as keyof T;
//         formErrors[field] = e.message;
//       });
//       setErrors(formErrors);
//       return false;
//     }
//   };

//   return {
//     values,
//     setValues,
//     errors,
//     handleChange,
//     handleBlur,
//     validateAll,
//   };
// }
