# Sử dụng Node.js Alpine image cho kích thước nhỏ
FROM node:20-alpine AS base

# Cài đặt pnpm globally
RUN npm install -g pnpm

# Tạo thư mục làm việc
WORKDIR /app

# Stage 1: Dependencies
FROM base AS deps
# Copy package.json và pnpm-lock.yaml để tận dụng Docker layer caching
COPY package.json pnpm-lock.yaml ./
# Cài đặt tất cả dependencies (bao gồm devDependencies)
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM base AS builder
WORKDIR /app
# Copy dependencies từ stage trước
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Build ứng dụng
RUN pnpm run build

# Stage 3: Production dependencies
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Chỉ cài đặt production dependencies
RUN pnpm install --prod --frozen-lockfile

# Stage 4: Production
FROM node:20-alpine AS production

# Tạo user không phải root để chạy ứng dụng
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

WORKDIR /app

# Copy built application từ builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
# Copy production dependencies
COPY --from=prod-deps --chown=nestjs:nodejs /app/node_modules ./node_modules
# Copy package.json để có thông tin về ứng dụng
COPY --chown=nestjs:nodejs package.json ./

# Chuyển sang user không phải root
USER nestjs

# Expose port mà ứng dụng sử dụng
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node --version || exit 1

# Chạy ứng dụng
CMD ["node", "dist/main"]
