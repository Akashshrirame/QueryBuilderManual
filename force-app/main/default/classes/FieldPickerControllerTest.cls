@isTest
public class FieldPickerControllerTest {
    
    @isTest
    public static void canGetPicklistValues() {
        String objName = 'Account';
        String fieldName = 'Type';
        List<FieldPickerController.Member> memberList = FieldPickerController.getPicklistValues(objName, fieldName);
        System.assertNotEquals(memberList, null,null);   
    }
}