// src/main/java/com/oms/dto/DashboardStats.java
package com.oms.dto;

public class DashboardStats {
    private long totalOrders;
    private long totalProducts;
    private double totalRevenue;

    public DashboardStats(long totalOrders, long totalProducts, double totalRevenue) {
        this.totalOrders = totalOrders;
        this.totalProducts = totalProducts;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }
}
