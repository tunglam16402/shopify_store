import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#1f2937',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  brand: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  brandSub: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 10,
  },

  invoiceBox: {
    alignItems: 'flex-end',
  },

  invoiceTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  invoiceMeta: {
    fontSize: 10,
    color: '#6b7280',
  },

  divider: {
    borderBottom: '1px solid #e5e7eb',
    marginVertical: 20,
  },

  addressWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  addressBlock: {
    width: '45%',
  },

  label: {
    fontSize: 9,
    textTransform: 'uppercase',
    marginBottom: 4,
    color: '#9ca3af',
  },

  addressText: {
    fontSize: 11,
    marginBottom: 2,
  },

  table: {
    marginTop: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid #e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },

  colProduct: { width: '42%' },
  colSku: { width: '18%' },
  colQty: { width: '10%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },

  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },

  totals: {
    marginTop: 30,
    width: 250,
    alignSelf: 'flex-end',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  totalLabel: {
    color: '#6b7280',
  },

  grandRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid #e5e7eb',
    fontSize: 13,
    fontWeight: 'bold',
  },

  footer: {
    marginTop: 60,
    fontSize: 10,
    textAlign: 'center',
    color: '#9ca3af',
  },
})