package com.oms.service;

import com.oms.model.Order;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;

import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class InvoiceService {

    public ByteArrayInputStream generateInvoice(Order order) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph("🧾 Order Invoice").setBold().setFontSize(20));
            document.add(new Paragraph("Order ID: " + order.getId()));
            document.add(new Paragraph("Customer: " + order.getCustomer()));
            document.add(new Paragraph("Date: " + order.getDate()));
            document.add(new Paragraph("Status: " + order.getStatus()));
            document.add(new Paragraph("\nItem Details:\n"));

            // Table with 3 columns
            Table table = new Table(3);
            table.addCell(new Cell().add(new Paragraph("Product")));
            table.addCell(new Cell().add(new Paragraph("Quantity")));
            table.addCell(new Cell().add(new Paragraph("Price")));

            // Add order data
            table.addCell(new Cell().add(new Paragraph(order.getProduct())));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(order.getQuantity()))));
            table.addCell(new Cell().add(new Paragraph("₹" + order.getPrice())));

            document.add(table);

            document.add(new Paragraph("\nTotal Amount: ₹" + order.getTotal()));
            document.close();

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
