import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { purchaseHistoryTable } from "../schemas/purchase_history";
import { PurchaseHistory } from "../models/purchase_histories.dto";

class PurchaseHistoryRepository {

    async findByStudentId(studentId: number): Promise<PurchaseHistory[]> {
        const purchaseHistories = await db.query.purchaseHistoryTable.findMany({
            where: eq(purchaseHistoryTable.studentId, studentId),
            with: {
                student: true,
                course: true
            }
        });
        return purchaseHistories.map(purchaseHistory => ({
            id: purchaseHistory.id,
            student: purchaseHistory.student,
            course: purchaseHistory.course,
            createdAt: purchaseHistory.createdAt,
            updatedAt: purchaseHistory.updatedAt
        }));
    }
}

export default PurchaseHistoryRepository;