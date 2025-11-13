import { z } from "zod";

/**
 * Vietnamese phone number validation schema
 * Validates 10-digit phone numbers starting with 0
 */
export const vietnamesePhoneSchema = z
    .string()
    .transform(val => val.replace(/\s/g, "")) // Remove spaces for validation
    .refine(
        val => /^0[0-9]{9}$/.test(val),
        "Số điện thoại phải có 10 số và bắt đầu bằng 0",
    );

/**
 * Vietnamese name validation schema
 * Validates names with Vietnamese characters and spaces only
 */
export const vietnameseNameSchema = z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được quá 100 ký tự")
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên chỉ được chứa chữ cái và khoảng trắng");

/**
 * Email validation schema
 */
export const emailSchema = z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(255, "Email không được quá 255 ký tự");

/**
 * Message validation schema
 */
export const messageSchema = z
    .string()
    .min(10, "Tin nhắn phải có ít nhất 10 ký tự")
    .max(500, "Tin nhắn không được quá 500 ký tự");
