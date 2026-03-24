import React from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Button,
  Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { parentMenu } from '../../components/layout/menus';
import { jsPDF } from "jspdf";

// ── School logo as Base64 PNG (green valley crest) ──────────────────────────
const SCHOOL_LOGO_B64 =
  "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";

const fees = [
  { id: 1, term: 'Term 1 (Apr-Jun)', amount: '₹12,000', dueDate: '2025-04-10', status: 'Paid', paidOn: '2025-04-08' },
  { id: 2, term: 'Term 2 (Jul-Sep)', amount: '₹12,000', dueDate: '2025-07-10', status: 'Paid', paidOn: '2025-07-09' },
  { id: 3, term: 'Term 3 (Oct-Dec)', amount: '₹12,000', dueDate: '2025-10-10', status: 'Paid', paidOn: '2025-10-07' },
  { id: 4, term: 'Term 4 (Jan-Mar)', amount: '₹12,000', dueDate: '2026-01-10', status: 'Paid', paidOn: '2026-01-09' },
  { id: 5, term: 'Activity Fee',     amount: '₹2,500',  dueDate: '2026-03-10', status: 'Pending', paidOn: '—' },
];

const ParentFees = () => {

  const handleDownloadReceipt = (fee) => {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    // ── Header background bar ──────────────────────────────────────────────
    doc.setFillColor(26, 58, 107);          // dark navy
    doc.rect(0, 0, pageW, 45, 'F');

    // ── School logo (top-left) ─────────────────────────────────────────────
    try {
      doc.addImage(SCHOOL_LOGO_B64, 'PNG', 10, 4, 36, 36);
    } catch (_) {
      // fallback circle if image fails
      doc.setFillColor(240, 192, 64);
      doc.circle(28, 22, 14, 'F');
    }

    // ── School name & tagline ──────────────────────────────────────────────
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Green Valley School', pageW / 2, 18, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Nurturing Minds, Building Futures', pageW / 2, 26, { align: 'center' });
    doc.text('Nagpur, Maharashtra  |  +91 94237 39041  |  info@greenvalley.edu', pageW / 2, 33, { align: 'center' });

    // ── "FEE RECEIPT" title strip ─────────────────────────────────────────
    doc.setFillColor(240, 192, 64);         // gold
    doc.rect(0, 45, pageW, 10, 'F');
    doc.setTextColor(26, 58, 107);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('FEE RECEIPT', pageW / 2, 52, { align: 'center' });

    // ── Receipt meta row ──────────────────────────────────────────────────
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Receipt No: RCPT-2025-${String(fee.id).padStart(4, '0')}`, 14, 65);
    doc.text(`Date: ${fee.paidOn}`, pageW - 14, 65, { align: 'right' });

    // thin divider
    doc.setDrawColor(220, 220, 220);
    doc.line(14, 68, pageW - 14, 68);

    // ── Student / Fee info table ──────────────────────────────────────────
    const col1 = 14, col2 = 75;
    const rows = [
      ['Student Name', 'Suresh Sharma'],
      ['Class & Section', 'Class 9 – A'],
      ['Academic Year', '2025–2026'],
      ['Term', fee.term],
      ['Amount Paid', fee.amount.replace('₹', 'Rs. ')],
      ['Payment Status', fee.status],
      ['Payment Mode', 'Online Transfer'],
    ];

    let y = 78;
    rows.forEach(([label, value], idx) => {
      const rowBg = idx % 2 === 0 ? [248, 249, 250] : [255, 255, 255];
      doc.setFillColor(...rowBg);
      doc.rect(14, y - 5, pageW - 28, 10, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text(label, col1 + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      doc.text(String(value), col2, y);

      y += 10;
    });

    // border around table
    doc.setDrawColor(200, 200, 200);
    doc.rect(14, 73, pageW - 28, y - 73, 'S');

    // ── Amount highlight box ──────────────────────────────────────────────
    y += 8;
    doc.setFillColor(232, 245, 233);        // light green
    doc.setDrawColor(52, 168, 83);
    doc.roundedRect(14, y, pageW - 28, 18, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(27, 94, 32);
    doc.text(`Total Paid: ${fee.amount.replace('₹', 'Rs. ')}`, pageW / 2, y + 12, { align: 'center' });

    // ── Footer ────────────────────────────────────────────────────────────
    y += 36;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    doc.text('This is a computer-generated receipt and does not require a physical signature.', pageW / 2, y, { align: 'center' });
    doc.text('For queries contact: accounts@greenvalley.edu  |  +91 94237 39041', pageW / 2, y + 6, { align: 'center' });

    // ── Authorised signature area ─────────────────────────────────────────
    y += 20;
    doc.setDrawColor(180, 180, 180);
    doc.line(pageW - 70, y, pageW - 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Authorised Signatory', pageW - 42, y + 5, { align: 'center' });

    // ── Bottom navy bar ───────────────────────────────────────────────────
    doc.setFillColor(26, 58, 107);
    doc.rect(0, doc.internal.pageSize.getHeight() - 10, pageW, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('© 2026 Green Valley School — All Rights Reserved', pageW / 2, doc.internal.pageSize.getHeight() - 4, { align: 'center' });

    doc.save(`${fee.term.replace(/[\s()]/g, '_')}_Receipt.pdf`);
  };

  return (
    <Layout menuItems={parentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        💰 Fee Payments
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ borderRadius: 3, flex: 1, minWidth: 150, borderLeft: '4px solid #34a853' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} color="#34a853">₹48,000</Typography>
            <Typography variant="caption" color="text.secondary">Total Paid</Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 3, flex: 1, minWidth: 150, borderLeft: '4px solid #fbbc04' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} color="#fbbc04">₹2,500</Typography>
            <Typography variant="caption" color="text.secondary">Pending</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Term</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Paid On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fees.map((f) => (
                <TableRow key={f.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{f.term}</TableCell>
                  <TableCell>{f.amount}</TableCell>
                  <TableCell>{f.dueDate}</TableCell>
                  <TableCell>
                    <Chip label={f.status} size="small" color={f.status === 'Paid' ? 'success' : 'warning'} />
                  </TableCell>
                  <TableCell>{f.paidOn}</TableCell>
                  <TableCell>
                    {f.status === 'Paid' ? (
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2 }} onClick={() => handleDownloadReceipt(f)}>
                        Receipt
                      </Button>
                    ) : (
                      <Button size="small" variant="contained" sx={{ borderRadius: 2 }}>
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ParentFees;