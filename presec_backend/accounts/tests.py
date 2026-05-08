from django.test import TestCase
from django.contrib.auth.models import User
from .models import Student, Teacher

class AccountsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='teststudent', password='password123')
        Student.objects.create(
            user=self.user,
            student_id='S123',
            class_name='Form 1',
            date_of_birth='2000-01-01',
            address='123 Street',
            phone='1234567890'
        )

    def test_student_profile(self):
        student = Student.objects.get(user=self.user)
        self.assertEqual(student.student_id, 'S123')
