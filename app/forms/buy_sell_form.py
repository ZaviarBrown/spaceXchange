from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired


class BuySellForm(FlaskForm):

    amount = IntegerField("Amount", validators=[DataRequired()])
    submit = SubmitField("Complete Order")
